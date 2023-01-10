from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUsers


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['username', 'email', 'firstname', 'lastname', 'birthday']

