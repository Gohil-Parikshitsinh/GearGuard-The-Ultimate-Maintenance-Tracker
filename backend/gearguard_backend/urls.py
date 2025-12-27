from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('apps.accounts.urls')),
    path('api/teams/', include('apps.teams.urls')),
    path('api/equipment/', include('apps.equipment.urls')),
    path('api/requests/', include('apps.maintenance.urls')),
    path('api/dashboard/', include('apps.dashboard.urls')),
    
    # Serve React Assets (Vite default output is in assets/)
    re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': str(settings.BASE_DIR / '../frontend/dist/assets')}),

    # Catch-all pattern for React Frontend
    # This must be last so it doesn't intercept API calls
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
