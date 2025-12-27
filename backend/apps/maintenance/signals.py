from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MaintenanceRequest

@receiver(post_save, sender=MaintenanceRequest)
def maintenance_request_post_save(sender, instance, created, **kwargs):
    """
    Business Logic Triggers:
    1. Scrap Logic: If status is 'SCRAP', mark equipment as scrapped.
    """
    if instance.status == 'SCRAP':
        equipment = instance.equipment
        # preventing unnecessary saves
        if not equipment.is_scrapped: 
            equipment.is_scrapped = True
            equipment.is_active = False # Assuming scrapped means inactive too
            equipment.save()
            print(f"Equipment {equipment.serial_number} marked as SCRAPPED.")
