from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from apps.account.models import Users

class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not user or not user.is_active:
            raise serializers.ValidationError("Incorrect credentials. Please try again.")
        return data


class UserRegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Users
        fields = ('email', 'first_name', 'last_name', 'password')
    
    def create(self, validated_data):
        print('➡ api/v1/account/serializers.py:27 validated_data:', validated_data)
        user = Users.objects.create_user(**validated_data)
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id','email','first_name','last_name')