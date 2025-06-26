from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('adminapi.v1.product.urls')),
    path('', include('adminapi.v1.account.urls')),
    # path('', include('adminapi.v1.cart.urls')),
    # path('', include('adminapi.v1.order.urls'))
]
