from rest_framework.serializers import ModelSerializer
from .models import Projects, ToDoNotes
from app.serializers import ShortCustomUserModelSerializer


class ProjectsModelSerializer(ModelSerializer):
    #users = ShortCustomUserModelSerializer(many=True)

    class Meta:
        model = Projects
        fields = ['id', 'project_name', 'description', 'url', 'users']


class ShortProjectsModelSerializer(ModelSerializer):
    class Meta:
        model = Projects
        fields = ['id', 'project_name']


class ToDoNotesModelSerializer(ModelSerializer):
    #owner = ShortCustomUserModelSerializer()
    #project = ShortProjectsModelSerializer()

    class Meta:
        model = ToDoNotes
        fields = ['id', 'active', 'title', 'text', 'project', 'owner', 'created', 'updated', 'dead_line']
