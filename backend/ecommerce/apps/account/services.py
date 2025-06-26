from apps.account.models import Users
from django.contrib.auth.models import Group

class UserService:
    @staticmethod
    def create_user(data):
        try: 
            role = data.pop('group')
            user = Users.objects.create_user(**data)
            group = Group.objects.get(name=role)
            user.groups.add(group)
            return True, user
        except Exception as e:
            return False, str(e)

class PasswordService:
    @staticmethod
    def password_change(user: Users, password: str):
        try: 
            user.set_password(password)
            user.save()
            print("Password has changed successfully!")
            return True, user
        except Exception as e:
            return False, str(e)
