from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import ListUsersSerializer, DetailUserSerializer, AdminLoginSerializer, UpdateUserSerilaizer
from adminapi.v1.permissions import AdminPermission
from apps.account.models import Users
from core.response import APIResponse
from core.constants import LOGIN_SUCCESS

class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = ListUsersSerializer
    # permission_classes = [AdminPermission]
    queryset = Users.objects.all().exclude(is_superuser=True)

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