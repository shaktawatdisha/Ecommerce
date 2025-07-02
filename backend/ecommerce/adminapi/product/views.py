from rest_framework import viewsets
# from .models import Category, Brand, Product, ProductImage, ProductAttribute, ProductSKU
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from apps.product.models import Category, Brand, Product, ProductImage, ProductAttribute, ProductSKU
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer, ProductImageSerializer, ProductAttributeSerializer, ProductSKUSerializer, ProductDetailSerializer, ProductSKUDetailSerializer
# from account.permissions import ActionBasedGroupPermission
from adminapi.permissions import AdminPermission
from .filters import ProductFilter


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AdminPermission]

    def get_queryset(self):
        if self.action == 'list':
            return Category.objects.filter(parent__isnull=True)
        return Category.objects.all() 


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AdminPermission]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    permission_classes = [AdminPermission]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'category__name', 'brand__name']
    ordering_fields = ['price', 'created_at', 'id']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductSerializer



class ProductAttributeViewSet(viewsets.ModelViewSet):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer
    permission_classes = [AdminPermission]


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [AdminPermission]

class ProductSKUViewSet(viewsets.ModelViewSet):
    queryset = ProductSKU.objects.all()
    # serializer_class = ProductSKUSerializer
    permission_classes = [AdminPermission]


    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductSKUDetailSerializer
        return ProductSKUSerializer


