from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import CartViewSet, WishlistViewSet, CartItemViewSet
from core.constants import CART_URL_NAME, WISHLIST_URL_NAME, CART_ITEM_URL_NAME

router = SimpleRouter(trailing_slash=False)

router.register('cart', CartViewSet, basename=CART_URL_NAME)
router.register('cartitem', CartItemViewSet, basename=CART_ITEM_URL_NAME)
router.register('wishlist', WishlistViewSet, basename=WISHLIST_URL_NAME)


urlpatterns = [
] + router.urls
