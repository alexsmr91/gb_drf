from django.db import models
from uuid import uuid4


class CustomUsers(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    email = models.CharField(max_length=64, unique=True)
    user_name = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday = models.DateField()

    def __str__(self):
        return f'{self.user_name} ({self.first_name} {self.last_name})'

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
