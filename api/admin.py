from django.contrib import admin

from .models import Cart, DeliveryAddress, Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    modle = Product
    ordering = ['name']
    list_separator = '|'
    list_display = ['name', 'category', 'image', 'price', 'attributes', 'available']
    search_fields = ['name']
    search_help_text = 'Search By Name'

@admin.register(DeliveryAddress)
class AddressAdmin(admin.ModelAdmin):
    modle = DeliveryAddress
    ordering = ['id']
    list_separator = '|'
    list_display = ['street_address', 'city', 'state', 'postal_code', 'address_type', 'country']
    search_fields = ['city']
    search_help_text = 'Search By city'

admin.site.register(Cart)