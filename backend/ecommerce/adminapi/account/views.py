from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.transaction import atomic, set_rollback

from .serializers import ListUsersSerializer, DetailUserSerializer, AdminLoginSerializer, UpdateUserSerilaizer, AdminRegisterSerializer
from adminapi.permissions import AdminPermission
from apps.account.models import Users
from core.response import APIResponse
from core.constants import LOGIN_SUCCESS

class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = ListUsersSerializer
    # permission_classes = [AdminPermission]
    queryset = Users.objects.all()#.exclude(is_superuser=True)

    def get_serializer_class(self):
        if self.action in ['list','create', 'delete']:
            return ListUsersSerializer
        elif self.action == 'retreive':
            return DetailUserSerializer
        elif self.action == 'update':
            return UpdateUserSerilaizer
        return DetailUserSerializer


class AdminLoginView(generics.GenericAPIView):
    serializer_class = AdminLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']  

            refresh = RefreshToken.for_user(user)  

            response_data = {
                'user': {
                    'id': user.id,
                    'email': user.email,
                },
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }

            return APIResponse(status=200, message="Login successful", data=response_data).response()

        return APIResponse(status=401, message="Invalid credentials", data=serializer.errors).response()

# Admin or staff register 
class AdminRegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = AdminRegisterSerializer

    @atomic()
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'host_name': request.get_host()})
        if serializer.is_valid():
            status, create_user = serializer.save()
            if not status:
                set_rollback(True)
                return APIResponse(status=200, message=LOGIN_SUCCESS, data=create_user).response() 

            # ✅ Generate JWT tokens
            refresh = RefreshToken.for_user(create_user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # ✅ Add tokens to validated_data
            serializer.validated_data['access'] = access_token
            serializer.validated_data['refresh'] = refresh_token

            return APIResponse(status=200, message=LOGIN_SUCCESS, data=serializer.validated_data).response()
        return APIResponse(status=400, message="Invalid data", data=serializer.errors).response()
        