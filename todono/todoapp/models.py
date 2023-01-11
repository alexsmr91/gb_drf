from django.db import models
from uuid import uuid4
from app.models import CustomUsers


class Projects(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project_name = models.CharField(max_length=64)
    description = models.CharField(max_length=2048, blank=True)
    url = models.URLField(max_length=250)
    users = models.ManyToManyField(CustomUsers)


class ToDoNotes(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    active = models.BooleanField(default=True)
    title = models.CharField(max_length=64)
    text = models.CharField(max_length=2048, blank=True)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    owner = models.ForeignKey(CustomUsers, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    dead_line = models.DateTimeField()
