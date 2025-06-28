# from rest_framework import serializers
# from apps.cart.models import Cart, Wishlist

# from api.v1.product.serializers import ProductImageSerializer, ProductSerializer, ProductVariantSerializer
# from api.v1.account.serializers import UserSerializer

# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = ['id','user','product','product_variant','quantity']
#         read_only_fields = ['user']
#         extra_kwargs = {
#             'quantity': {'required': False}  
#         }

#     def create(self, validated_data):
#         print("validated data", validated_data)
#         user = self.context['request'].user
#         product = validated_data['product']
#         product_variant = validated_data.get('product_variant')
#         quantity = validated_data.get('quantity', 1)
#         validated_data['user'] = user

#         existing_items = Cart.objects.filter(user=user, product=product, product_variant=product_variant)

#         if existing_items.exists():
#             cart_item = existing_items.first()
#             cart_item.quantity += quantity
#             cart_item.save()
#         else:
#             cart_item = Cart.objects.create(
#                 user=user,
#                 product=product,
#                 product_variant=product_variant,
#                 quantity=quantity
#             )

#         return cart_item
    

    
# class CartDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = ['id', 'user', 'product', 'product_variant', 'quantity']

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)

#         if instance.product_variant is not None:
#             representation['product'] = {
#                 'id': instance.product_variant.id,
#                 'name': instance.product_variant.product.name, 
#                 'color': instance.product_variant.color,
#                 'size': instance.product_variant.size,
#                 'price': instance.product_variant.price,
#                 'stock_quantity': instance.product_variant.stock_quantity,
#                 'images': ProductImageSerializer(instance.product_variant.product.product_images.all(), many=True, context=self.context).data
#             }
#         else:
#             representation['product'] = {
#                 'id': instance.product.id,
#                 'name': instance.product.name,
#                 'price': instance.product.price,
#                 'stock_quantity': instance.product.stock_quantity,
#                 'images': ProductImageSerializer(instance.product.product_images.all(), many=True, context=self.context).data
#             }

#         return representation


        
# class WishlistSerializer(serializers.ModelSerializer):
#     product = ProductSerializer(read_only=True)
#     # user = UserSerializer()
#     # product_variant = ProductVariantSerializer()
#     class Meta:
#         model = Wishlist
#         fields = ['id','user','product','product_variant']
#         read_only_fields = ['user']


#     def create(self, validated_data):
#         user = self.context['request'].user
#         product = validated_data['product']
#         validated_data['user'] = user
#         if not Wishlist.objects.filter(user=user, product=product).exists():
#             return super().create(validated_data)




from rest_framework import serializers
from apps.cart.models import Cart, CartItem, Wishlist
from apps.product.models import Product, ProductVariant
from apps.account.models import Users

# CartItem Serializer
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_variant', 'quantity']
        read_only_fields =['cart']

    def validate(self, attrs):
        print('➡ api/v1/cart/serializers.py:106 attrs:', attrs)
        """
        Validate and associate the cart with the current user automatically.
        """
        request = self.context.get('request')  
        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError("Authentication is required.")

        user_cart, created = Cart.objects.get_or_create(user=request.user)
        CartItem.objects.update_or_create(
        cart=user_cart,
        product=attrs.get('product'),
        product_variant=attrs.get('product_variant'),
        defaults={
            'quantity': attrs.get('quantity', 1)  
        }
    )
        attrs['cart'] = user_cart  
        return attrs

# Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']


# Wishlist Serializer
class WishlistSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_variant_name = serializers.CharField(source='product_variant.name', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'product_name', 'product_variant', 'product_variant_name']
