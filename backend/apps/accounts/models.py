from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    """
    Custom user manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'ADMIN')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

# User Roles
# Easy to expand later if needed
ROLE_CHOICES = (
    ('ADMIN', 'Admin'),
    ('TECHNICIAN', 'Technician'),
    ('EMPLOYEE', 'Employee'),
)

class User(AbstractUser):
    """
    Custom User model where email is the unique identifier instead of username.
    Includes role-based access control for the hackathon project.
    """
    username = None  # Remove username field
    email = models.EmailField('email address', unique=True)
    
    # Extra fields for the hackathon
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='EMPLOYEE')
    # is_active is already in AbstractUser, but we can explicit if needed. 
    # For now, inheriting it is fine.
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Email & Password are required by default

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.email} ({self.role})"
