from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import User

UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "email", "name", "password"]

    def create(self, validated_data):
        user = User.objects.create(email=validated_data['email'],
                                       name=validated_data['name']
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user


