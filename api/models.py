from pyexpat import model
from types import CoroutineType
from django.db import models
from django.contrib.auth.models import User

ADDRESS_TYPE = (
    ("home", "Home"),
    ("work", "Work")
)
COUNTRY = (
    ("india", "India"),
)

class DeliveryAddress(models.Model):
    street_address = models.CharField(verbose_name="Street Address", max_length=255)
    city = models.CharField(verbose_name="City", max_length=255)
    state = models.CharField(verbose_name="State", max_length=255)
    postal_code = models.IntegerField(verbose_name="Postal Code")
    address_type = models.CharField(verbose_name="Address Type", choices=ADDRESS_TYPE, max_length=255, default="home")
    country = models.CharField(verbose_name="Couuntry", choices=COUNTRY, max_length=255, default="india")

    def __str__(self):
        return self.street_address

class UserProfile(models.Model):
    user = models.ForeignKey(User, verbose_name="User", on_delete=models.CASCADE)
    address = models.ManyToManyField("DeliveryAddress",verbose_name="Product")

    def __str__(self):
        return self.user

class Category(models.Model):
    name = models.CharField(verbose_name='categories', max_length=255)
    image = models.CharField(verbose_name='image', max_length=255)

    def __str__(self):
        return self.name
class Product(models.Model):
    name = models.CharField(verbose_name="Name", max_length=255)
    category = models.ForeignKey("Category", verbose_name="Category", on_delete=models.CASCADE)
    image = models.CharField(verbose_name="Image", max_length=255)
    price = models.CharField(verbose_name="Price", max_length=100)
    attributes = models.JSONField(verbose_name="Attributes")
    available = models.BooleanField(verbose_name="Available")

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.ForeignKey(User, verbose_name="User", on_delete=models.CASCADE)
    product = models.ManyToManyField("Product", verbose_name="Product")


class Order(models.Model):
    user = models.ForeignKey(User, verbose_name="User", on_delete=models.CASCADE, default="")
    product = models.ManyToManyField("Product", verbose_name="Product")
    address = models.ForeignKey("DeliveryAddress",verbose_name="Product", on_delete=models.CASCADE, default="")
    date_of_order = models.DateField(verbose_name="Date of order", blank=True, null=False, auto_now=True)
    payment_mode = models.CharField(verbose_name="Payment Mode", max_length=255, default="")
    delivered = models.BooleanField(verbose_name="Delivered", default=False)
