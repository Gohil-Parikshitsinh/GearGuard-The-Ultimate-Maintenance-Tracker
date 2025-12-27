from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    """
    Basic serializer to return user details.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined', 'is_active']


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer to handle user registration.
    """
    password = serializers.CharField(write_only=True)
    full_name = serializers.CharField(write_only=True, required=False) # Helper to split into first/last name if needed

    class Meta:
        model = User
        fields = ['email', 'password', 'role', 'full_name']

    def create(self, validated_data):
        # Handle full name splitting logic for simplicity
        full_name = validated_data.pop('full_name', '')
        first_name, last_name = "", ""
        if full_name:
            parts = full_name.split(' ', 1)
            first_name = parts[0]
            if len(parts) > 1:
                last_name = parts[1]
        
        # Create user using create_user helper to hash password
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'EMPLOYEE'),
            first_name=first_name,
            last_name=last_name
        )
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer to validate credentials and return JWT tokens.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")
            
            data['user'] = user
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")
        return data
    
    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role,
            'full_name': f"{user.first_name} {user.last_name}".strip()
        }
