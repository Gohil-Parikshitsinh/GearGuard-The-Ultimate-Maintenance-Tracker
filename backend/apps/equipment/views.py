from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Equipment
from .serializers import EquipmentSerializer, EquipmentDetailSerializer

class EquipmentListCreateAPI(APIView):
    """
    GET: List all equipment. Supports filtering.
    POST: Create new equipment (Admin only).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Start with all active equipment (or all if admin wants to see scrapped/inactive?) 
        # Requirement says "List all equipment" + soft delete. Usually lists show only active.
        equipments = Equipment.objects.filter(is_active=True)

        # Filters
        department = request.query_params.get('department')
        team_id = request.query_params.get('maintenance_team')

        if department:
            equipments = equipments.filter(department__iexact=department)
        if team_id:
            equipments = equipments.filter(maintenance_team_id=team_id)

        serializer = EquipmentDetailSerializer(equipments, many=True)
        return Response({
            "message": "Equipment list fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        if request.user.role != 'ADMIN':
             return Response({
                "message": "Permission denied. Only Admins can add equipment."
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = EquipmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Equipment added successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            "message": "Failed to add equipment",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class EquipmentDetailAPI(APIView):
    """
    GET: Retrieve equipment details.
    PATCH: Update details (Admin/Manager).
    DELETE: Soft delete (set is_active=False).
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Equipment, pk=pk)

    def get(self, request, pk):
        equipment = self.get_object(pk)
        serializer = EquipmentDetailSerializer(equipment)
        return Response({
            "message": "Equipment details fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        # Admin or maybe Technician Manager? Requirement says "Admin only" for create.
        # Let's restrict Update to Admin for now to keep it simple.
        if request.user.role != 'ADMIN':
            return Response({
                "message": "Permission denied."
            }, status=status.HTTP_403_FORBIDDEN)

        equipment = self.get_object(pk)
        serializer = EquipmentSerializer(equipment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Equipment updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            "message": "Update failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Soft delete the equipment.
        """
        if request.user.role != 'ADMIN':
             return Response({
                "message": "Permission denied."
            }, status=status.HTTP_403_FORBIDDEN)
        
        equipment = self.get_object(pk)
        equipment.is_active = False
        equipment.save()
        
        return Response({
            "message": "Equipment deactivated successfully"
        }, status=status.HTTP_204_NO_CONTENT)
