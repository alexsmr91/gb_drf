from django.db import models
from uuid import uuid4


class CustomUsers(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    email = models.CharField(max_length=64, unique=True)
    username = models.CharField(max_length=64, unique=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    birthday = models.DateField()
