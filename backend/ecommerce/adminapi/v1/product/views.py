from rest_framework import viewsets

from .serializers import CategorySerializer, ProductSerializer
from apps.product.models import Product, Category
from adminapi.v1.permissions import AdminPermission


class CategoryViewset(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def list(self, request, *args, **kwargs):
        print('➡ backend/ecommerce/adminapi/v1/product/views.py:13 request:', request)
        return super().list(request, *args, **kwargs)
    # permission_classes = [AdminPermission]

    # def create(self, request, *args, **kwargs):
    #     print('➡ adminapi/v1/product/views.py:14 request:', request.data)
    #     return super().create(request, *args, **kwargs)

class ProductViewset(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    # permission_classes = [AdminPermission]

    def create(self, request, *args, **kwargs):
        print('➡ adminapi/v1/product/views.py:14 request:', request.data)
        return super().create(request, *args, **kwargs)