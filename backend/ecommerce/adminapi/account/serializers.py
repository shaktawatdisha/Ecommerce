# Admin login serializer

from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from apps.account.models import Users
from apps.account.services import UserService
# from .services import Userservice


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
    
class AdminRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    profile_image = serializers.ImageField(required=False)
    phone = serializers.ImageField(required=False)
    group = serializers.CharField(required=True)

    class Meta:
        model = Users
        fields = ['email', 'password', 'confirm_password', 'group', 'phone', 'profile_image']
        extra_kwargs = {
            'email': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError()
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')  
        print('➡ account/serializers.py:50 validated_data:', validated_data)
        
        return UserService.create_user(data=validated_data)
    