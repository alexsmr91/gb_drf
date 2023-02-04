from rest_framework.viewsets import GenericViewSet
from .models import CustomUsers
from .serializers import CustomUserModelSerializer
from rest_framework import mixins


class CustomUsersModelViewSet(mixins.CreateModelMixin,
                              mixins.ListModelMixin,
                              mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              GenericViewSet):
    queryset = CustomUsers.objects.get_queryset().order_by('id')
    serializer_class = CustomUserModelSerializer
