from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BrandViewSet, ProductViewSet, ProductImageViewSet, ProductAttributeViewSet, ProductSKUViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'brands', BrandViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'product-attributes', ProductAttributeViewSet)
router.register(r'product-skus', ProductSKUViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
