from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import CartSerializer, WishlistSerializer, CartItemSerializer

from apps.cart.models import Cart, Wishlist, CartItem

# class CartViewSet(ModelViewSet):
#     serializer_class = CartSerializer
#     # queryset = Cart.objects.all()
#     permission_classes = [IsAuthenticated]

#     def get_serializer_class(self):
#         if self.action in ['retrieve', 'list']:
#             return CartDetailSerializer
#         elif self.action in ['create', 'update', 'destroy']:
#             return CartSerializer
#         return CartSerializer

#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)
    
#     def create(self, request, *args, **kwargs):
#         print("cart request", request.data)
#         return super().create(request, *args, **kwargs)
    

# class WishlistViewSet(ModelViewSet):
#     serializer_class = WishlistSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         print("self.get_queryset", self)
#         return Wishlist.objects.filter(user=self.request.user)

# Cart ViewSet
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart=Cart.objects.filter(user=self.request.user)
        print('➡ api/v1/cart/views.py:44 cart:', cart)
        return cart

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# CartItem ViewSet
class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)
    
    def perform_create(self, serializer):
        print('cart item detail', self.request.user)
        # if the product already exists in the cart it must increase the quantity
        user_cart = Cart.objects.get(user=self.request.user)
        serializer.save(cart=user_cart)


# Wishlist ViewSet
class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
