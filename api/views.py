from re import sub
from decimal import Decimal

from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


from .models import Category, Product, Cart, UserProfile, DeliveryAddress, Order
from .serializers import CartSerializer, CategorySerializer, OrderSerializer, ProductSerializer, UserSerializer, UserProfileSerializer, AddressSerializer


class CategoryView(APIView):
    http_method_names = ['get']
    
    def get(self, request, format=None):
        category = Category.objects.all()
        categoryserializer = CategorySerializer(category, many=True)
        products =  Product.objects.all().order_by('-id')[:5]
        productserializer = ProductSerializer(products, many=True)
        data={
            'prodcuts': productserializer.data,
            'category': categoryserializer.data
        }
        return Response(data)

class ProductView(APIView):
    http_method_names = ['get']
    
    def get(self, request, format=None):
        category = request.GET['category']
        product = Product.objects.filter(category_id = category)
        serializer = ProductSerializer(product, many=True)
        data = {
            'category': Category.objects.filter(id=category).get().name,
            'data': serializer.data
        }
        return Response(data)

class CartView(APIView):
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']

    def get(self, request, format=None):
        cart = Cart.objects.filter(user=request.user)
        cartserializer = CartSerializer(cart, many=True)
        if cartserializer.data[0]['product']:
            productserializer = ProductSerializer(Product.objects.filter(id__in=cartserializer.data[0]['product']), many=True)
            total_price = 0.00
            for product in productserializer.data:
                total_price = total_price + float(Decimal(sub(r'[^\d.]', '', product['price'])))
            
            data = {
                'products' : productserializer.data,
                'total_price':  total_price
            }
            return Response(data)
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, format=None):
        if request.user.is_authenticated:
            if Cart.objects.filter(user=request.user).first():
                cart=Cart.objects.filter(user=request.user).first()
                product = Product.objects.filter(id=request.data['product']).first()
                cart.product.add(product)
                cart.save()
                return Response('Item added to cart successfully.',status=status.HTTP_200_OK)
            
            return Response('Unable to add Item to your cart please try after sometime!',status=status.HTTP_403_FORBIDDEN)
        return Response('Please Login befor adding product to cart',status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, format=None):
        if Cart.objects.filter(user=request.user).first():
            cart=Cart.objects.filter(user=request.user).first()
            product = Product.objects.filter(id=request.data['product']).first()
            cart.product.remove(product)
            cart.save()
            return Response('Item removed successfully.',status=status.HTTP_200_OK)
        
        return Response('Unable to remove Item from your cart please try after sometime!',status=status.HTTP_403_FORBIDDEN)


class OrderView(APIView):
    http_method_names = ['get', 'post']

    def get(self, request, format=None):
        orderserializer = OrderSerializer(Order.objects.filter(user=request.user.id).all(), many=True)
        product_ids = []
        orders=[]
        for order in orderserializer.data:
            temp_order=[]
            productserializer = ProductSerializer(Product.objects.filter(id__in=order['product']).all(),many=True)
            temp_order.append(order['id'])
            for product in productserializer.data:
                orders.append([
                    product['image'],
                    product['name'],
                    product['price'],
                    order['date_of_order'],
                    order['payment_mode']
                ])
            # orders.append(temp_order)
        data={
            "order": orders
        }
        return Response(data,status=status.HTTP_200_OK)

    def post(self, request, format=None):
        product_ids = request.data.getlist('products[]')
        order = Order.objects.create(user=User.objects.filter(id=request.user.id).first(), 
                                    payment_mode = request.data.get('payment_mode'), 
                                    address = DeliveryAddress.objects.filter(id=request.data['address']).first()
                                    )
        for product_id in product_ids:
            order.product.add(Product.objects.filter(id=product_id).first().id)
        
        order.save()
        cart=Cart.objects.filter(user=request.user).first()
        for product_id in product_ids:
            cart.product.remove(Product.objects.filter(id=product_id).first().id)
        
        cart.save()
        return Response('Order Placed Successfully',status=status.HTTP_200_OK)

class UserAddressView(APIView):
    http_method_names = ['get']
    def get(self, request, format=None):
        if request.user:
            user = UserProfileSerializer(UserProfile.objects.filter(user_id = request.user.id), many=True)
            address = AddressSerializer(DeliveryAddress.objects.filter(id__in = user.data[0]['address']).all(), many=True)
            return Response(address.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    http_method_names = ['get', 'post', 'delete']

    def get(self, request, format=None):
        pass

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if request.data['username']:
            username = request.data['username']
            email = request.data['email']
            if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
                return Response('User already Exist', status=status.HTTP_226_IM_USED)
            if serializer.is_valid():
                user = serializer.create(serializer.validated_data)
                cart = Cart(user=user)
                cart.save()
                login(request, user)
                return Response('User Created Successfully', status=status.HTTP_201_CREATED)
        return Response('Wrong Data', status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        pass


class UserLoginView(APIView):
    http_method_names = ['post']

    def post(self, request, format=None):
        form = AuthenticationForm(data=request.data)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            goto_page = request.META.get('HTTP_REFERER').split('/')[len(request.META.get('HTTP_REFERER').split('/'))-2]
            if goto_page == 'login':
                goto_page = ''
            return Response(goto_page, status=status.HTTP_200_OK)
        else:
            return Response('Please recheck your username and password and try again..',status=status.HTTP_401_UNAUTHORIZED)
