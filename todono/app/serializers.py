from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUsers


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'email', 'user_name', 'first_name', 'last_name', 'birthday']


class ShortCustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['first_name', 'last_name']

