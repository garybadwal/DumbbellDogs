from dataclasses import field
from pyexpat import model
from statistics import mode
from django import forms
from rest_framework import serializers
from .models import Cart, Category, DeliveryAddress, Order, Product, UserProfile
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'image'
        )

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            '__all__'
        )

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = (
            '__all__'
        )

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = (
            '__all__'
        )

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'product',
            'date_of_order',
            'delivered',
            'payment_mode'
        )

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            '__all__'
        )

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
