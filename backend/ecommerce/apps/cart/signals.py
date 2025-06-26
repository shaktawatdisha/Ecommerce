# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from apps.account.models import Users
# from apps.cart.models import Cart 

# @receiver(post_save, sender=Users)
# def create_cart_for_user(sender, instance, created, **kwargs):
#     if created:
#         Cart.objects.create(user=instance)