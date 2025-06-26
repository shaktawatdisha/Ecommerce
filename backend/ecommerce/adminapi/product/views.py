from rest_framework import viewsets
# from .models import Category, Brand, Product, ProductImage, ProductAttribute, ProductSKU
from apps.product.models import Category, Brand, Product, ProductImage, ProductAttribute, ProductSKU
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer, ProductImageSerializer, ProductAttributeSerializer, ProductSKUSerializer, ProductDetailSerializer, ProductSKUDetailSerializer
# from account.permissions import ActionBasedGroupPermission
from adminapi.permissions import AdminPermission


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
    queryset = Product.objects.all()
    permission_classes = [AdminPermission]

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


