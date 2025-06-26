# Admin login serializer

from rest_framework import serializers
from django.contrib.auth import authenticate

from apps.account.models import Users
from adminapi.v1.order.serializers import OrderItemsSerializer, ListUserOrderSerializer


class ListUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','email', 'first_name', 'last_name']

class UpdateUserSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email','first_name', 'last_name']

class DetailUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        # fields = '__all__'
        fields = ['id', 
                  'last_login', 
                  'email', 
                  'first_name', 
                  'last_name',
                  'is_active',
                  'date_joined',
                #   'address',
                #   'orders',
                  ]
        
class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not user or not user.is_active:
            raise serializers.ValidationError("Incorrect credentials. Please try again.")
        if not user.is_superuser:
            raise serializers.ValidationError("You are not authorized to login!")
        data['user'] = user
        return data