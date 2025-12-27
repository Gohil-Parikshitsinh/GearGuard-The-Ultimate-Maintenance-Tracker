from rest_framework import serializers
from .models import Equipment

class EquipmentSerializer(serializers.ModelSerializer):
    """
    Basic Equipment Serializer for Create and Update operations.
    """
    class Meta:
        model = Equipment
        fields = [
            'id', 'name', 'serial_number', 'category', 'department', 'location', 
            'purchase_date', 'warranty_expiry', 'is_active', 
            'maintenance_team', 'assigned_to', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class EquipmentDetailSerializer(serializers.ModelSerializer):
    """
    Detailed Serializer showing related names instead of just IDs.
    """
    maintenance_team_name = serializers.CharField(source='maintenance_team.name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.full_name', read_only=True) # Assuming User model has full_name helper or field
    open_request_count = serializers.SerializerMethodField()

    class Meta:
        model = Equipment
        fields = [
            'id', 'name', 'serial_number', 'category', 'department', 'location', 
            'purchase_date', 'warranty_expiry', 'is_active', 
            'maintenance_team', 'maintenance_team_name', 
            'assigned_to', 'assigned_to_name', 'created_at',
            'open_request_count'
        ]

    def get_open_request_count(self, obj):
        # Count requests that are NEW or IN_PROGRESS
        return obj.maintenance_requests.filter(status__in=['NEW', 'IN_PROGRESS']).count()
