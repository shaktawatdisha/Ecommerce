from django.db import models
from apps.product.models import Product
from apps.account.models import Users


# class Cart(models.Model):
#     id = models.AutoField(primary_key=True, editable=False)
#     user = models.OneToOneField(Users, on_delete=models.CASCADE, related_name='cart_user')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Cart of {self.user.email}"
    
# class CartItem(models.Model):
#     id = models.AutoField(primary_key=True, editable=False)
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name="cart_product")
#     product_variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, related_name="cart_product_variant")
#     quantity = models.PositiveIntegerField(default=1)


# class Wishlist(models.Model):
#     id = models.AutoField(primary_key=True, editable=False)
#     user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user_wishlist")
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
#     product_variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, blank=True, null=True)

#     def __str__(self):
#         return f"{self.user}-Wishlist"