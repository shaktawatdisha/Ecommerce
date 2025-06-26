from django.db import models
from apps.account.models import Users
from apps.product.models import Product, ProductVariant

class Order(models.Model):
    STATUS_CHOICES = [
        ('placed', 'Placed'),
        ('processing', 'Processing'),
        ('shipping', 'Shipping'),
        ('delivered', 'Delivered'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('paid', 'Paid'),
        ('not_paid', 'Not Paid'),
    ]

    PAYMENT_TYPE_CHOICES = [
        ('netbanking', 'Netbanking'),
        ('upi', 'UPI'),
        ('cod', 'Cash on Delivery'),
    ]
    id = models.AutoField(primary_key=True, editable=False)
    order_number = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="user_order")
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)
    sub_total = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_amount = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='placed')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='not_paid')
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPE_CHOICES, default='cod')
    payment_transaction_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order number {self.order_number} of user {self.user.first_name}"


class OrderItems(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, related_name="product_order_items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True, related_name="variant_order_items")
    product_name = models.CharField(max_length=255)
    color = models.CharField(max_length=50, null=True, blank=True)
    size = models.CharField(max_length=20, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Automatically calculate total amount if price and quantity are provided
        if self.price and self.quantity:
            self.total_amount = self.price * self.quantity
        super(OrderItems, self).save(*args, **kwargs)

    def __str__(self):
        return f"Order Item for {self.order.order_number} - {self.product_name}"