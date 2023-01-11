from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Projects, ToDoNotes
from app.serializers import ShortCustomUserModelSerializer


class ProjectsModelSerializer(HyperlinkedModelSerializer):
    users = ShortCustomUserModelSerializer(many=True)

    class Meta:
        model = Projects
        fields = ['project_name', 'description', 'url', 'users']


class ShortProjectsModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Projects
        fields = ['project_name']


class ToDoNotesModelSerializer(HyperlinkedModelSerializer):
    owner = ShortCustomUserModelSerializer()
    project = ShortProjectsModelSerializer()

    class Meta:
        model = ToDoNotes
        fields = ['active', 'title', 'text', 'project', 'owner', 'created', 'updated', 'dead_line']
