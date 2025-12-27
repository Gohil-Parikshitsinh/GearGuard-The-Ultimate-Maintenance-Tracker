from rest_framework import serializers
from .models import MaintenanceRequest

class MaintenanceRequestSerializer(serializers.ModelSerializer):
    """
    Basic Serializer for Create/Update.
    """
    class Meta:
        model = MaintenanceRequest
        fields = '__all__'
        read_only_fields = ['maintenance_team', 'created_by', 'created_at', 'updated_at', 'is_overdue']

class MaintenanceRequestDetailSerializer(serializers.ModelSerializer):
    """
    Detailed Serializer showing related names.
    """
    equipment_name = serializers.CharField(source='equipment.name', read_only=True)
    maintenance_team_name = serializers.CharField(source='maintenance_team.name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.full_name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.full_name', read_only=True)

    class Meta:
        model = MaintenanceRequest
        fields = [
            'id', 'subject', 'description', 'request_type', 'status',
            'equipment', 'equipment_name',
            'maintenance_team', 'maintenance_team_name',
            'assigned_to', 'assigned_to_name',
            'created_by', 'created_by_name',
            'scheduled_date', 'duration_hours', 'is_overdue',
            'created_at', 'updated_at'
        ]
