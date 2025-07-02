from django_filters import rest_framework as filters
from apps.product.models import Product

class ProductFilter(filters.FilterSet):
    category = filters.NumberFilter(field_name='category__id')
    brand = filters.CharFilter(field_name='brand__id', lookup_expr='icontains')
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'min_price', 'max_price']