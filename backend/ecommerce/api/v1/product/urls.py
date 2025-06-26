from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import (ProductViewSet, CategoryViewSet, ProductImageViewSet, ProductVariantSerializer, ProductVariantViewSet)
from core.constants import (PRODUCT_URL_NAME, CATEGORY_URL_NAME, PRODUCT_IMAGE_URL_NAME, PRODUCT_VARIANT_URL_NAME)

router = SimpleRouter(trailing_slash=False)

router.register('product', ProductViewSet, basename=PRODUCT_URL_NAME)
router.register('category', CategoryViewSet, basename=CATEGORY_URL_NAME)
router.register('productimage', ProductImageViewSet, basename=PRODUCT_IMAGE_URL_NAME)
router.register('productvariant', ProductVariantViewSet, basename=PRODUCT_VARIANT_URL_NAME)


urlpatterns = [

] + router.urls
