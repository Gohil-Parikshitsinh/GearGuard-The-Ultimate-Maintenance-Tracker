from django.db import models
from django.conf import settings
from ..teams.models import MaintenanceTeam

class Equipment(models.Model):
    """
    Represents physical assets/machines in the company.
    """
    # Basic Info
    name = models.CharField(max_length=100)
    serial_number = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100) # e.g. IT, Mechanical, Electrical
    department = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    # Dates & Status
    purchase_date = models.DateField()
    warranty_expiry = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True) # Soft delete flag
    created_at = models.DateTimeField(auto_now_add=True)

    # Ownership & Responsibility
    maintenance_team = models.ForeignKey(
        MaintenanceTeam,
        on_delete=models.PROTECT,
        related_name="equipments"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_assets",
        help_text="Employee who is responsible for or uses this equipment."
    )

    def __str__(self):
        return f"{self.name} ({self.serial_number})"

    is_scrapped = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.serial_number})"
