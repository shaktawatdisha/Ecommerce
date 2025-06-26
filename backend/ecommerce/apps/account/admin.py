from django.contrib import admin
from .models import Users

# admin.site.register(Users)

class UsersAdmin(admin.ModelAdmin):
    list_display = ['id','username','first_name','last_name', 'email']
    # list_display = [field.name for field in Users._meta.fields]

admin.site.register(Users, UsersAdmin)
# admin.site.register(Wishlist)