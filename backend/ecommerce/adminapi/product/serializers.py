from rest_framework import serializers
from django.core.exceptions import ValidationError
# from utils.helpers import resize_image
from apps.product.models import (
    Category,
    Brand,
    Product,
    ProductImage,
    ProductAttribute,
    ProductSKU
)

class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'subcategories']

    def get_subcategories(self, obj):
        children = obj.subcategories.all()
        return CategorySerializer(children, many=True).data


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo']


class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'name', 'value']


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage  # replace with your actual model
        fields = ['id', 'image', 'attribute', 'sku']

    def get_image(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand', write_only=True)
    images = ProductImageSerializer(many=True, read_only=True)


    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description',
            'price', 'stock', 'is_available', 'created_at',
            'category', 'category_id',
            'brand', 'brand_id', 'images'
        ]


class ProductSKUSerializer(serializers.ModelSerializer):
    attributes = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ProductAttribute.objects.all()
    )
    sku = serializers.CharField(required=False)

    class Meta:
        model = ProductSKU
        fields = ['id', 'product', 'attributes', 'sku', 'price', 'stock']

    def create(self, validated_data):
        request = self.context.get('request')
        image = request.FILES.get('uploaded_images')  # <-- uploaded image here
        attributes = validated_data.pop('attributes', [])
        product = validated_data['product']

        # Generate SKU
        attr_values = [f"{a.name[:3]}-{a.value[:3]}" for a in attributes]
        sku_code = f"{product.name[:5].upper()}-" + "-".join(attr_values).upper()

        validated_data['sku'] = sku_code
        sku = ProductSKU.objects.create(**validated_data)
        sku.attributes.set(attributes)

        # Save image if provided
        if image: ProductImage.objects.create(product=product, sku=sku, image=image)

        return sku

class ProductSKUDetailSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = ProductSKU
        fields = ['id', 'product', 'attributes', 'sku', 'price', 'stock', 'images']

    def get_images(self, obj):
        request = self.context.get('request')  # fetch request context
        images = obj.images.all()
        return ProductImageSerializer(images, many=True, context={'request': request}).data


class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)  # related_name='images' on product
    skus = ProductSKUDetailSerializer(source='productsku_set', many=True, read_only=True)
    category = serializers.StringRelatedField()
    brand = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description',
            'category', 'brand',
            'is_available', 'created_at',
            'images', 'skus'
        ]
