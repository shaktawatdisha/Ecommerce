
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    """
    custom user queries
    """

    def __init__(self) -> None:
        print("test")
        super().__init__()

    use_for_related_fields = True

    @property
    def removed(self):
        """
        get removed users
        """
        return self.get_queryset().filter(
            profile__in=self.objects.filter(removed_at__isnull=False)
        )
    
    def create_superuser(self, email, password, **extra_fields):
        """
        custom method to create super user and user profile
        """
        extra_fields['is_superuser'] = True
        extra_fields['is_staff'] = True
        user = self.create_user(
            email,
            password,
            **extra_fields
        )
        
        return user
    
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with given username, email and password
        """
        if not email:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        user = self.model(username=email, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        print('➡ apps/account/managers.py:49 saved user:', user)
        return user
