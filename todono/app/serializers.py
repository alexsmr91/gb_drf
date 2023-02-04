from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUsers


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'birthday']


class CustomUserModelSerializer2(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'birthday', 'is_superuser', 'is_staff']


class ShortCustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'first_name', 'last_name']

