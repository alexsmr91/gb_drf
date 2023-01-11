from django.http import Http404
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .filters import ProjectsFilter, ToDoNotesFilter
from .models import Projects, ToDoNotes
from .serializers import ToDoNotesModelSerializer, ProjectsModelSerializer
from todono.settings import REST_FRAMEWORK

settings_page_size = REST_FRAMEWORK['PAGE_SIZE']


class ToDoNotesPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = settings_page_size


class ProjectsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = settings_page_size


class ToDoNotesModelViewSet(ModelViewSet):
    queryset = ToDoNotes.objects.get_queryset().order_by('id')
    serializer_class = ToDoNotesModelSerializer
    pagination_class = ToDoNotesPagination
    filterset_class = ToDoNotesFilter

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.active = False
            instance.save()
        except Http404:
            pass
        return Response(status=status.HTTP_200_OK)


class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.get_queryset().order_by('id')
    serializer_class = ProjectsModelSerializer
    pagination_class = ProjectsPagination
    filterset_class = ProjectsFilter
