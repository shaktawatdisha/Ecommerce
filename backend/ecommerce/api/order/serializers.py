import datetime
import random

from rest_framework import serializers
from apps.order.models import Order, OrderItems


class OrderItemsSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['product', 'product_variant', 'product_name', 'color', 'size', 'price', 'quantity', 'total_amount']

class OrderSerializers(serializers.ModelSerializer):
    order_items = OrderItemsSerializers(many=True)
    class Meta:
        model = Order
        fields = ['id','user','order_number', 'discount_amount', 'sub_total', 'shipping_amount', 'grand_total', 'status', 
                  'payment_status', 'payment_type', 'payment_transaction_id', 'order_items']
        extra_kwargs = {
            'order_number': {'required':False}
        }
        read_only_fields = ['user']

        
    def create(self, validated_data):
        order_details = validated_data.pop('order_items')
        validated_data['user'] =  self.context['request'].user

        timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S') 
        random_number = random.randint(1000, 9999) 
        order_number = f"{timestamp}{random_number}"  

        validated_data['order_number'] = order_number

        order = Order.objects.create(**validated_data)

        for items in order_details:
            OrderItems.objects.create(order=order, **items)
        return order

