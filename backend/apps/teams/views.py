from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import MaintenanceTeam
from .serializers import TeamSerializer, TeamDetailSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class TeamListCreateAPI(APIView):
    """
    GET: List all maintenance teams.
    POST: Create a new team (Admin only).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        teams = MaintenanceTeam.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return Response({
            "message": "Teams fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        # Role check: Only ADMIN can create teams
        if request.user.role != 'ADMIN':
             return Response({
                "message": "Permission denied. Only Admins can create teams."
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            return Response({
                "message": "Team created successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            "message": "Failed to create team",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class TeamDetailAPI(APIView):
    """
    GET: Retrieve team details with members.
    PATCH: Update team info or members (Admin/Manager).
    DELETE: Delete team (Admin only).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        team = get_object_or_404(MaintenanceTeam, pk=pk)
        serializer = TeamDetailSerializer(team)
        return Response({
            "message": "Team details fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        # Simple update logic (Admin only for now)
        if request.user.role != 'ADMIN':
             return Response({
                "message": "Permission denied."
            }, status=status.HTTP_403_FORBIDDEN)
        
        team = get_object_or_404(MaintenanceTeam, pk=pk)
        
        # Handle adding members if provided (list of IDs)
        member_ids = request.data.get('member_ids')
        if member_ids is not None:
            technicians = User.objects.filter(id__in=member_ids, role='TECHNICIAN')
            team.members.set(technicians) # Using set to replace members, or add if using add()

        serializer = TeamSerializer(team, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Team updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
            
        return Response({
            "message": "Update failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if request.user.role != 'ADMIN':
             return Response({
                "message": "Permission denied."
            }, status=status.HTTP_403_FORBIDDEN)
        
        team = get_object_or_404(MaintenanceTeam, pk=pk)
        team.delete()
        return Response({
            "message": "Team deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)
