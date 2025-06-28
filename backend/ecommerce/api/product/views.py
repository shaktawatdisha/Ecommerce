from rest_framework import viewsets
from .serializers import (
    CategorySerializer, BrandSerializer, ProductSerializer,
    ProductAttributeSerializer, ProductSKUSerializer, ProductImageSerializer
)
from apps.product.models import Category, Brand, Product, ProductAttribute, ProductSKU, ProductImage


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductAttributeViewSet(viewsets.ModelViewSet):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer

class ProductSKUViewSet(viewsets.ModelViewSet):
    queryset = ProductSKU.objects.all()
    serializer_class = ProductSKUSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
