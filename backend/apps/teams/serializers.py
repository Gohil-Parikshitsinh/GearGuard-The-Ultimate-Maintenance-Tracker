from rest_framework import serializers
from .models import MaintenanceTeam
from django.contrib.auth import get_user_model

User = get_user_model()

class UserMemberSerializer(serializers.ModelSerializer):
    """
    Simple serializer for team members (Technicians).
    """
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

class TeamSerializer(serializers.ModelSerializer):
    """
    Basic Team Serializer for list views.
    """
    class Meta:
        model = MaintenanceTeam
        fields = ['id', 'name', 'description', 'created_at']

class TeamDetailSerializer(serializers.ModelSerializer):
    """
    Detailed Team Serializer including members.
    """
    members = UserMemberSerializer(many=True, read_only=True)

    class Meta:
        model = MaintenanceTeam
        fields = ['id', 'name', 'description', 'members', 'created_at']
