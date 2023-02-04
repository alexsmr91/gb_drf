from rest_framework.viewsets import GenericViewSet
from .models import CustomUsers
from .serializers import CustomUserModelSerializer, CustomUserModelSerializer2
from rest_framework import mixins


class CustomUsersModelViewSet(mixins.CreateModelMixin,
                              mixins.ListModelMixin,
                              mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              GenericViewSet):
    queryset = CustomUsers.objects.get_queryset().order_by('id')

    def get_serializer_class(self):
        if self.request.version == '1.0':
            return CustomUserModelSerializer
        if self.request.version == '2.0':
            return CustomUserModelSerializer2
