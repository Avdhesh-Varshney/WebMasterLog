from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
# from .validations import custom_validation, validate_email, validate_password
from rest_framework.permissions import IsAuthenticated  # Allow access without authentication


class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class Hi(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        return Response("YOLO")