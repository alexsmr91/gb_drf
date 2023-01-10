from rest_framework.viewsets import ModelViewSet
from .models import CustomUsers
from .serializers import CustomUserModelSerializer


class CustomUserModelViewSet(ModelViewSet):
    queryset = CustomUsers.objects.all()
    serializer_class = CustomUserModelSerializer
