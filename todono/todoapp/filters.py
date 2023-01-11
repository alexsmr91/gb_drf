from django_filters.rest_framework import FilterSet, CharFilter, ModelChoiceFilter, DateFromToRangeFilter
from .models import Projects, ToDoNotes


class ProjectsFilter(FilterSet):
    project_name = CharFilter(lookup_expr='contains')

    class Meta:
        model = Projects
        fields = ['project_name']


class ToDoNotesFilter(FilterSet):
    project = ModelChoiceFilter(queryset=Projects.objects.all())
    created = DateFromToRangeFilter()

    class Meta:
        model = ToDoNotes
        fields = ['project', 'created']
