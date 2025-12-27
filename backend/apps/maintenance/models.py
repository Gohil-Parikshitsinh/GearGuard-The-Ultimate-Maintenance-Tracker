from django.db import models
from django.contrib.auth.models import User
from ..equipment.models import Equipment
from ..teams.models import MaintenanceTeam


class MaintenanceRequest(models.Model):

    REQUEST_TYPE_CHOICES = [
        ("CORRECTIVE", "Corrective"),
        ("PREVENTIVE", "Preventive"),
    ]

    STATUS_CHOICES = [
        ("NEW", "New"),
        ("IN_PROGRESS", "In Progress"),
        ("REPAIRED", "Repaired"),
        ("SCRAP", "Scrap"),
    ]

    subject = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    request_type = models.CharField(
        max_length=20,
        choices=REQUEST_TYPE_CHOICES
    )

    equipment = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="maintenance_requests"
    )

    maintenance_team = models.ForeignKey(
        MaintenanceTeam,
        on_delete=models.PROTECT,
        related_name="maintenance_requests"
    )

    technician = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="maintenance_tasks"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="NEW"
    )

    scheduled_date = models.DateField(null=True, blank=True)
    duration_hours = models.FloatField(null=True, blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_requests"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # Preventive must have scheduled date
        if self.request_type == "PREVENTIVE" and not self.scheduled_date:
            raise ValueError("Preventive request must have a scheduled date.")

        # Corrective should not have scheduled date
        if self.request_type == "CORRECTIVE" and self.scheduled_date:
            raise ValueError("Corrective request should not have a scheduled date.")

        # Repaired must have duration
        if self.status == "REPAIRED" and self.duration_hours is None:
            raise ValueError("Repaired request must have duration hours.")

    def __str__(self):
        return f"{self.subject} - {self.equipment.name}"
