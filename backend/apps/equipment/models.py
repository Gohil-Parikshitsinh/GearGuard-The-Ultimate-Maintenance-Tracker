from django.db import models
from django.contrib.auth.models import User
from ..teams.models import MaintenanceTeam


class Equipment(models.Model):
    name = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100, unique=True)
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    purchase_date = models.DateField()
    warranty_expiry = models.DateField(null=True, blank=True)

    maintenance_team = models.ForeignKey(
        MaintenanceTeam,
        on_delete=models.PROTECT,
        related_name="equipments"
    )

    default_technician = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_equipments"
    )

    is_scrapped = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.serial_number})"
