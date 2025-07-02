from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
import random
from apps.product.models import Category, Brand, Product, ProductAttribute, ProductSKU, ProductImage

class Command(BaseCommand):
    help = 'Seed database with categories, brands, products, and related data'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database...")

        # Clear old data (optional)
        ProductImage.objects.all().delete()
        ProductSKU.objects.all().delete()
        ProductAttribute.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        Brand.objects.all().delete()

        # 1. Create 10 Brands
        brand_names = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus', 'OnePlus', 'Xiaomi']
        brands = []
        for name in brand_names:
            brand = Brand.objects.create(name=name)
            brands.append(brand)

        # 2. Create 10 Categories
        categories = []
        for i in range(1, 11):
            name = f"Category {i}"
            category = Category.objects.create(name=name, slug=slugify(name))
            categories.append(category)

        # 3. Create ProductAttributes
        color_attr = ProductAttribute.objects.get_or_create(name="Color", value="Black")[0]
        storage_attr = ProductAttribute.objects.get_or_create(name="Storage", value="128GB")[0]

        # 4. Create 10 products per category
        for category in categories:
            for j in range(1, 11):
                product_name = f"{category.name} Product {j}"
                product_slug = slugify(product_name)
                product = Product.objects.create(
                    name=product_name,
                    slug=product_slug,
                    description=f"Description for {product_name}",
                    category=category,
                    brand=random.choice(brands),
                    price=random.uniform(100.00, 2000.00),
                    stock=random.randint(5, 50),
                    is_available=True
                )

                # SKU
                sku_code = f"{slugify(product.name)}-SKU"
                sku = ProductSKU.objects.create(
                    product=product,
                    sku=sku_code,
                    price=product.price,
                    stock=product.stock
                )
                sku.attributes.set([color_attr, storage_attr])

                # Image (dummy image)
                img = Image.new('RGB', (200, 200), color=(random.randint(0,255), random.randint(0,255), random.randint(0,255)))
                buffer = BytesIO()
                img.save(buffer, format='JPEG')
                buffer.seek(0)
                image_file = ContentFile(buffer.read(), name=f"{sku_code}.jpg")

                ProductImage.objects.create(
                    product=product,
                    sku=sku,
                    image=image_file,
                    attribute=color_attr
                )

        self.stdout.write(self.style.SUCCESS("✔ Seeded 10 categories, 10 brands, and 100 products successfully!"))
