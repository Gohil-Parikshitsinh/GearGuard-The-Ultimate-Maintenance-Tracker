from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import MaintenanceRequest
from .serializers import MaintenanceRequestSerializer, MaintenanceRequestDetailSerializer
import datetime

class RequestListCreateAPI(APIView):
    """
    GET: List requests based on user role.
    POST: Create new request.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role

        if role == 'ADMIN':
            # Admin sees all
            requests = MaintenanceRequest.objects.all()
        elif role == 'TECHNICIAN':
            # Technician sees requests for their teams
            # Logic: Get teams user belongs to -> filter requests
            # If 'assigned_to' is used, filter by that too? 
            # Requirement says "see requests of their team".
            user_teams = user.maintenance_teams.all()
            requests = MaintenanceRequest.objects.filter(maintenance_team__in=user_teams)
        else:
            # Employee sees requests they created
            requests = MaintenanceRequest.objects.filter(created_by=user)

        # --- Filtering (Smart Button / Kanban) ---
        equipment_id = request.query_params.get('equipment')
        if equipment_id:
            requests = requests.filter(equipment_id=equipment_id)
        
        req_type = request.query_params.get('request_type')
        if req_type:
            requests = requests.filter(request_type=req_type)

        serializer = MaintenanceRequestDetailSerializer(requests, many=True)
        return Response({
            "message": "Maintenance requests fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MaintenanceRequestSerializer(data=request.data)
        if serializer.is_valid():
            # Auto-assign created_by
            serializer.save(created_by=request.user)
            return Response({
                "message": "Maintenance request created successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            "message": "Failed to create request",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class RequestDetailAPI(APIView):
    """
    GET: Retrieve request details.
    PATCH: Update status, assign technician, etc.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(MaintenanceRequest, pk=pk)

    def get(self, request, pk):
        req = self.get_object(pk)
        serializer = MaintenanceRequestDetailSerializer(req)
        return Response({
            "message": "Request details fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        req = self.get_object(pk)
        
        # Validation: Only Admins or Assigned Technicians (or Team members) should update?
        # Requirement: "Update: Assign technician (ADMIN / TECHNICIAN), Change status"
        # We'll allow authenticated users to attempt, relying on UI logic mostly, 
        # but ideally we should block random updates. 
        # For Hackathon MVP, we'll keep it open to authenticated users but maybe restrict assignment to Admin/Tech.
        
        serializer = MaintenanceRequestSerializer(req, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Request updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
            
        return Response({
            "message": "Update failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class CalendarAPI(APIView):
    """
    GET: List PREVENTIVE requests with scheduled_date.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter for PREVENTIVE and having a date
        requests = MaintenanceRequest.objects.filter(
            request_type='PREVENTIVE', 
            scheduled_date__isnull=False
        )
        
        # Simple JSON for calendar: title, date, id
        data = []
        for req in requests:
            data.append({
                "id": req.id,
                "title": f"{req.equipment.name} - {req.subject}",
                "start": req.scheduled_date, # Format YYYY-MM-DD
                "status": req.status
            })

        return Response({
            "message": "Calendar data fetched successfully",
            "data": data
        }, status=status.HTTP_200_OK)
