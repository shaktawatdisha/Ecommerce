from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import OrderItemsViewSets, OrderViewSets
from core.constants import (ORDER_URL_NAME, ORDER_ITEM_URL_NAME)

router = SimpleRouter(trailing_slash=False)

router.register('order', OrderViewSets, basename=ORDER_URL_NAME)
router.register('orderitem', OrderItemsViewSets, basename=ORDER_ITEM_URL_NAME)


urlpatterns = [

] + router.urls
