from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, UserDataSerializer
# from .validations import custom_validation, validate_email, validate_password
from rest_framework.permissions import IsAuthenticated  # Allow access without authentication
from .models import User

class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class Hi(APIView):
    def post(self,request):
        return Response("YOLO")
    
class IsLoggedIn(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        user = User.objects.filter(id=user_id).first()

        if user:
            # Serialize the user data
            serialized_data = UserDataSerializer(user).data
            return Response({"isLoggedIn": True, "message": "The access token is valid", "data": serialized_data})
        else:
            return Response({"isLoggedIn": False, "message": "User not found"}, status=404)