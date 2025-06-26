from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin

from apps.order.models import Order, OrderItems
from .serializers import OrderSerializers, OrderItemsSerializers


class OrderViewSets(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin, viewsets.GenericViewSet):
    serializer_class = OrderSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    

class OrderItemsViewSets(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin, viewsets.GenericViewSet):
    queryset = OrderItems.objects.all()
    serializer_class = OrderItemsSerializers
    permission_classes = [IsAuthenticated]

