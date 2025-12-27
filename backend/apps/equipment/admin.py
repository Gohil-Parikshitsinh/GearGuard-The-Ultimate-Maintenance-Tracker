from django.contrib import admin
from .models import Equipment
# Register your models here.

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'serial_number', 'category', 'department', 'maintenance_team', 'is_active')
    search_fields = ('name', 'serial_number', 'category')
    list_filter = ('category', 'maintenance_team', 'is_active')