from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('api.product.urls')),
    path('', include('api.account.urls'))
    # path('', include('api.cart.urls')),
    # path('', include('api.order.urls'))
]
