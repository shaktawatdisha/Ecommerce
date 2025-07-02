from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (
    CategorySerializer, BrandSerializer, ProductSerializer,
    ProductAttributeSerializer, ProductSKUSerializer, ProductImageSerializer, ProductListSerializer
)
from apps.product.models import Category, Brand, Product, ProductAttribute, ProductSKU, ProductImage

class ProductPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'brand']

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return super().get_serializer_class()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        print('➡ backend/ecommerce/api/product/views.py:37 queryset:', queryset)
        # page = self.paginate_queryset(queryset)
        # if queryset is None:
        #     return self.get_paginated_response([])
        return super().list(request, *args, **kwargs)


class ProductAttributeViewSet(viewsets.ModelViewSet):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer


class ProductSKUViewSet(viewsets.ModelViewSet):
    queryset = ProductSKU.objects.all()
    serializer_class = ProductSKUSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
