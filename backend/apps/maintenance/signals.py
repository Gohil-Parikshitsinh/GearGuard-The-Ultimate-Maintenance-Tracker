from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import MaintenanceRequest

@receiver(pre_save, sender=MaintenanceRequest)
def auto_fill_maintenance_team(sender, instance, **kwargs):
    """
    Auto-assign maintenance team from the selected equipment.
    """
    if instance.equipment and not instance.maintenance_team:
        # Automatically set team based on equipment's team
        instance.maintenance_team = instance.equipment.maintenance_team

@receiver(post_save, sender=MaintenanceRequest)
def handle_scrap_status(sender, instance, **kwargs):
    """
    If status moves to SCRAP, deactivate the equipment.
    """
    if instance.status == 'SCRAP' and instance.equipment.is_active:
        instance.equipment.is_active = False
        instance.equipment.save()
