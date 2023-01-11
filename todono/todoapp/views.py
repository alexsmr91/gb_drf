from rest_framework.viewsets import ModelViewSet
from .models import Projects, ToDoNotes
from .serializers import ToDoNotesModelSerializer, ProjectsModelSerializer


class ToDoNotesModelViewSet(ModelViewSet):
    queryset = ToDoNotes.objects.all()
    serializer_class = ToDoNotesModelSerializer


class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectsModelSerializer
