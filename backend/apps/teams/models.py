from django.db import models
from django.contrib.auth.models import User


class MaintenanceTeam(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    members = models.ManyToManyField(
        User,
        related_name="maintenance_teams",
        blank=True
    )

    def __str__(self):
        return self.name
