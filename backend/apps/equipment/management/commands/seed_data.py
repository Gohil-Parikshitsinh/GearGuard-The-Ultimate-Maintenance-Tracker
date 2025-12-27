from django.core.management.base import BaseCommand
from apps.teams.models import MaintenanceTeam
from apps.equipment.models import Equipment
from datetime import date

class Command(BaseCommand):
    help = 'Seeds database with initial Teams and Equipment'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Create Teams
        teams = [
            {'name': 'Mechanics', 'desc': 'Handles mechanical failures'},
            {'name': 'Electricians', 'desc': 'Handles electrical systems'},
            {'name': 'IT Support', 'desc': 'Computers and tech'}
        ]
        
        created_teams = {}
        for t in teams:
            team, created = MaintenanceTeam.objects.get_or_create(
                name=t['name'],
                defaults={'description': t['desc']}
            )
            created_teams[t['name']] = team
            if created:
                self.stdout.write(f"Created Team: {t['name']}")

        # 2. Create Equipment
        equipments = [
            {
                'name': 'CNC Lathe 01', 'serial': 'CNC-001', 'cat': 'Mechanical', 
                'dept': 'Production', 'team': 'Mechanics', 'loc': 'Floor 1, Zone A'
            },
            {
                'name': 'Industrial Printer', 'serial': 'PRT-999', 'cat': 'IT', 
                'dept': 'HR', 'team': 'IT Support', 'loc': 'Office 202'
            },
            {
                'name': 'Conveyor Belt Main', 'serial': 'CNV-555', 'cat': 'Mechanical', 
                'dept': 'Logistics', 'team': 'Mechanics', 'loc': 'Loading Dock'
            },
            {
                'name': 'Main Switchboard', 'serial': 'ELC-101', 'cat': 'Electrical', 
                'dept': 'Facilities', 'team': 'Electricians', 'loc': 'Basement'
            },
        ]

        for e in equipments:
            team = created_teams.get(e['team'])
            if not team:
                continue

            obj, created = Equipment.objects.get_or_create(
                serial_number=e['serial'],
                defaults={
                    'name': e['name'],
                    'category': e['cat'],
                    'department': e['dept'],
                    'location': e['loc'],
                    'maintenance_team': team,
                    'purchase_date': date(2023, 1, 1),
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(f"Created Equipment: {e['name']}")
            else:
                self.stdout.write(f"Equipment already exists: {e['name']}")

        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
