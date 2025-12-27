from django.urls import path
from .views import RequestListCreateAPI, RequestDetailAPI, CalendarAPI

urlpatterns = [
    path('', RequestListCreateAPI.as_view(), name='request-list-create'),
    path('<int:pk>/', RequestDetailAPI.as_view(), name='request-detail'),
    path('calendar/', CalendarAPI.as_view(), name='request-calendar'),
]
