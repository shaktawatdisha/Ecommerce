from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from .views import CustomLoginView, CustomRegisterView, UserProfileView
from core.constants import REGISTER_URL_NAME, LOGIN_URL_NAME


urlpatterns = [
    # path('login', CustomLoginView.as_view(), name=LOGIN_URL_NAME),
    path('register', CustomRegisterView.as_view(), name=REGISTER_URL_NAME),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile', UserProfileView.as_view(), name="profile"),
    
]
