from django.urls import path
from .views import EquipmentListCreateAPI, EquipmentDetailAPI

urlpatterns = [
    path('', EquipmentListCreateAPI.as_view(), name='equipment-list-create'),
    path('<int:pk>/', EquipmentDetailAPI.as_view(), name='equipment-detail'),
]
