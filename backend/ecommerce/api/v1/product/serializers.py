from django.conf import settings
from rest_framework import serializers

from apps.product.models import Product, Category, ProductImage, ProductVariant


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'description', 'subcategory')


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage  # Assuming ProductImage is your image model
        fields = ['id', 'image_url', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        print('➡ api/v1/product/serializers.py:22 request:', request)
        if request:
            return request.build_absolute_uri(obj.image_file.url)
        return f"{settings.MEDIA_URL}{obj.image_file.url}" 


class ProductSerializer(serializers.ModelSerializer):
    image = ProductImageSerializer(many=True, read_only=True, source='product_images')
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'brand', 'category', 'price', 'stock_quantity', 'status', 'slug', 'created_at','updated_at','image']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ProductDetailSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True, source='product_variants')
    images = ProductImageSerializer(many=True, read_only=True, source='product_images')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'brand', 'category', 'price', 'stock_quantity', 'status', 'variants', 'images']