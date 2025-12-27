from django.urls import path
from .views import DashboardSummaryAPI, DashboardAnalyticsAPI, DashboardCalendarAPI

urlpatterns = [
    path('summary/', DashboardSummaryAPI.as_view(), name='dashboard-summary'),
    path('analytics/', DashboardAnalyticsAPI.as_view(), name='dashboard-analytics'),
    path('calendar/', DashboardCalendarAPI.as_view(), name='dashboard-calendar'),
]
