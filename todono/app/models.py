from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4


class CustomUsers(AbstractUser):
    id = models.UUIDField(default=uuid4, primary_key=True)
    email = models.CharField(max_length=64, unique=True)
    birthday = models.DateField(auto_now_add=True)
