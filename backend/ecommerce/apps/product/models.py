from django.db import models
from django.db.models import UniqueConstraint
from django.utils.text import slugify


class Category(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    subcategory = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='subcategories')

    class Meta:
        constraints = [
            UniqueConstraint(fields=['name', 'subcategory'], name='unique_category_name_per_subcategory')
        ]

    def __str__(self):
        return f"Category:{self.name} subCategory:{self.subcategory}"


class Product(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name="product_category")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField() 
    status = models.BooleanField(default=True) 
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey('Product', on_delete=models.SET_NULL, related_name="product_variants", null=True)
    color = models.CharField(max_length=50, null=True, blank=True)
    size = models.CharField(max_length=20, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)  
    stock_quantity = models.PositiveIntegerField()  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Variant of {self.product.name} - {self.color} - {self.size}"



class ProductImage(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_images")
    image_file = models.ImageField(upload_to='product_images/', blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image for {self.product.name}"



