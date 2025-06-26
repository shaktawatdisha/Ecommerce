from rest_framework.permissions import BasePermission

class AdminPermission(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        if request.user and request.user.is_superuser:
            return True
        return False