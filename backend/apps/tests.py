from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.teams.models import MaintenanceTeam
from apps.equipment.models import Equipment
from apps.maintenance.models import MaintenanceRequest

User = get_user_model()

class SystemFlowTest(APITestCase):
    def setUp(self):
        # 1. Create Users
        self.admin = User.objects.create_superuser(email='admin@test.com', password='adminpass', role='ADMIN')
        self.technician = User.objects.create_user(email='tech@test.com', password='techpass', role='TECHNICIAN')
        self.employee = User.objects.create_user(email='emp@test.com', password='emppass', role='EMPLOYEE')

        # Get Tokens
        self.admin_token = self.get_token('admin@test.com', 'adminpass')
        self.tech_token = self.get_token('tech@test.com', 'techpass')
        self.emp_token = self.get_token('emp@test.com', 'emppass')

    def get_token(self, email, password):
        response = self.client.post('/api/accounts/login/', {'email': email, 'password': password})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response.data['data']['access']

    def test_full_lifecycle(self):
        print("\n--- Starting Full System Lifecycle Test ---")

        # 1. Create Team (Admin)
        print("1. Admin creating Maintenance Team...")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')
        response = self.client.post('/api/teams/', {
            'name': 'Alpha Squad',
            'description': 'Elite Support'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        team_id = response.data['data']['id']

        # 2. Add Technician to Team (Update Team)
        print("2. Assigning Technician to Team...")
        # Note: Our views might rely on simple adding logic or the model.
        # For this test, let's just use ORM for setup speed if the view doesn't support direct add, 
        # BUT we implemented update in view. Let's try to pass member IDs if supported or just add via ORM.
        # Looking back at code: 'member_ids' param in PATCH.
        response = self.client.patch(f'/api/teams/{team_id}/', {
            'member_ids': [self.technician.id]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # 3. Create Equipment (Admin)
        print("3. Admin creating Equipment...")
        response = self.client.post('/api/equipment/', {
            'name': 'Generator X-1',
            'serial_number': 'GEN-001',
            'category': 'Power',
            'department': 'Operations',
            'location': 'Basement',
            'purchase_date': '2025-01-01',
            'maintenance_team': team_id,
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        equipment_id = response.data['data']['id']

        # 4. Create Maintenance Request (Employee)
        print("4. Employee raising Maintenance Request...")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.emp_token}')
        response = self.client.post('/api/requests/', {
            'subject': 'Loud Noise',
            'description': 'Making banging sounds',
            'equipment': equipment_id,
            'request_type': 'CORRECTIVE'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        request_id = response.data['data']['id']
        
        # Verify Signal Auto-fill (Team should be Alpha Squad)
        self.assertEqual(response.data['data']['maintenance_team'], team_id)
        print("   -> Signal Verified: Team auto-assigned.")

        # 5. Technician View (Check Visibility)
        print("5. Technician checking requests...")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.tech_token}')
        response = self.client.get('/api/requests/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['id'], request_id)
        print("   -> Visibility Verified: Technician sees team request.")

        # 6. Dashboard Stats (Admin)
        print("6. Admin checking Dashboard Summary...")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')
        response = self.client.get('/api/dashboard/summary/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        stats = response.data['data']
        self.assertEqual(stats['total_equipment'], 1)
        self.assertEqual(stats['total_requests'], 1)
        self.assertEqual(stats['open_requests'], 1)
        print("   -> Dashboard Verified: Counters match.")

        print("--- Test Completed Successfully ---")
