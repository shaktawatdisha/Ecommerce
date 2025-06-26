from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductAttribute(models.Model):
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

    class Meta:
        unique_together = ('name', 'value')  
        verbose_name = 'Product Attribute'
        verbose_name_plural = 'Product Attributes'

    def __str__(self):
        return f"{self.name}: {self.value}"


class ProductSKU(models.Model):
    # Size, color, price or stock
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    attributes = models.ManyToManyField(ProductAttribute)
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return self.sku
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')
    sku = models.ForeignKey(ProductSKU, on_delete=models.CASCADE, null=True, blank=True, related_name='images')
    attribute = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.image:
            img = Image.open(self.image)
            max_size = (800, 800)
            img.thumbnail(max_size)

            buffer = BytesIO()
            img.save(buffer, format=img.format or 'JPEG', quality=85)
            buffer.seek(0)
            self.image = ContentFile(buffer.read(), name=self.image.name)

        super().save(*args, **kwargs)

    def __str__(self):
        base = f"{self.product.name}"
        if self.attribute:
            base += f" - {self.attribute.name}: {self.attribute.value}"
        if self.sku:
            base += f" (SKU: {self.sku.sku})"
        return base


