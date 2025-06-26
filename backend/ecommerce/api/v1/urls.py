from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('api.v1.product.urls')),
    path('', include('api.v1.account.urls')),
    path('', include('api.v1.cart.urls')),
    path('', include('api.v1.order.urls'))
]
