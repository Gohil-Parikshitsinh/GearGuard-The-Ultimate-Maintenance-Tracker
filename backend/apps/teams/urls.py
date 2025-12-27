from django.urls import path
from .views import TeamListCreateAPI, TeamDetailAPI

urlpatterns = [
    path('', TeamListCreateAPI.as_view(), name='team-list-create'),
    path('<int:pk>/', TeamDetailAPI.as_view(), name='team-detail'),
]
