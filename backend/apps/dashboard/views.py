from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils import timezone
from django.db.models import Count, Q

from apps.equipment.models import Equipment
from apps.maintenance.models import MaintenanceRequest

class DashboardSummaryAPI(APIView):
    """
    KPI Cards: Total stats based on user role.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role

        # Base Querysets
        equipments = Equipment.objects.all()
        requests = MaintenanceRequest.objects.all()

        # Filter based on role
        if role == 'TECHNICIAN':
            user_teams = user.maintenance_teams.all()
            equipments = equipments.filter(maintenance_team__in=user_teams)
            requests = requests.filter(maintenance_team__in=user_teams)
        elif role == 'EMPLOYEE':
             # Employee sees their own requests, but maybe all equipment?
             # Let's say they see equipment assigned to them or generally all.
             # Strict: Only their requests
             requests = requests.filter(created_by=user)
        
        # Calculate Stats
        total_equipment = equipments.count()
        active_equipment = equipments.filter(is_active=True).count()
        
        total_requests = requests.count()
        open_requests = requests.filter(status__in=['NEW', 'IN_PROGRESS']).count()
        overdue_requests = requests.filter(is_overdue=True).count()
        completed_requests = requests.filter(status='REPAIRED').count()

        data = {
            "total_equipment": total_equipment,
            "active_equipment": active_equipment,
            "total_requests": total_requests,
            "open_requests": open_requests,
            "overdue_requests": overdue_requests,
            "completed_requests": completed_requests
        }
        return Response({"message": "Summary fetched successfully", "data": data})

class DashboardAnalyticsAPI(APIView):
    """
    Aggregated data for charts.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Admin view mostly, but Technicians can see their team stats.
        user = request.user
        requests = MaintenanceRequest.objects.all()

        if user.role == 'TECHNICIAN':
             user_teams = user.maintenance_teams.all()
             requests = requests.filter(maintenance_team__in=user_teams)
        elif user.role == 'EMPLOYEE':
             requests = requests.filter(created_by=user)

        # 1. Requests per Team
        requests_by_team = requests.values('maintenance_team__name').annotate(count=Count('id'))
        
        # 2. Requests per Status
        requests_by_status = requests.values('status').annotate(count=Count('id'))

        # 3. Preventive vs Corrective
        requests_by_type = requests.values('request_type').annotate(count=Count('id'))

        return Response({
            "message": "Analytics details fetched",
            "data": {
                "by_team": list(requests_by_team),
                "by_status": list(requests_by_status),
                "by_type": list(requests_by_type)
            }
        })

class DashboardCalendarAPI(APIView):
    """
    Upcoming Preventive Maintenance.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = timezone.now().date()
        
        # Only Preventive, Scheduled >= Today
        requests = MaintenanceRequest.objects.filter(
            request_type='PREVENTIVE',
            scheduled_date__gte=today
        )

        if user.role == 'TECHNICIAN':
             user_teams = user.maintenance_teams.all()
             requests = requests.filter(maintenance_team__in=user_teams)
        elif user.role == 'EMPLOYEE':
             requests = requests.filter(created_by=user)

        # Serialize simple data
        data = []
        for req in requests:
            data.append({
                "id": req.id,
                "title": f"Preventive: {req.equipment.name}",
                "start": req.scheduled_date,
                "team": req.maintenance_team.name if req.maintenance_team else "Unassigned",
                "status": req.status
            })

        return Response({
            "message": "Upcoming calendar events fetched",
            "data": data
        })
