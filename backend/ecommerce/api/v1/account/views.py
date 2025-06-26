from django.shortcuts import render
from rest_framework import generics, mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CustomLoginSerializer, UserRegistrationSerializer, UserSerializer
from core.response import APIResponse
from apps.account.models import Users
from core.constants import LOGIN_SUCCESS, USER_CREATION_SUCCESS


class CustomLoginView(generics.GenericAPIView):
    serializer_class = CustomLoginSerializer
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return APIResponse(status=200, message=LOGIN_SUCCESS, data=serializer.validated_data).response()        
        return APIResponse(status=401, message=serializer.errors, data={}).response()
    
    
class CustomRegisterView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        print('➡ api/v1/account/views.py:29 request:', request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print('➡ api/v1/account/views.py:38 user:', user)
            return APIResponse(status=200, message=USER_CREATION_SUCCESS, data=serializer.validated_data).response()
        return APIResponse(status=401, message=serializer.errors, data={}).response()
    

class UserProfileView(mixins.ListModelMixin, generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    serializer_class = UserSerializer

    def get_queryset(self):
        return Users.objects.filter(id=self.request.user.id)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)



def index(request):
    return render(request, 'index.html')