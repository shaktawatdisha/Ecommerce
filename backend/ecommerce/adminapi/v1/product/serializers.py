from rest_framework import serializers

from apps.product.models import Category, Product


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name'] 

class CategorySerializer(serializers.ModelSerializer): 
    subcategory = SubcategorySerializer(read_only=True)
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Product
        fields = '__all__'

