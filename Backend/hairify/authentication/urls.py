from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register', views.RegisterView.as_view(), name="sign_up"),
	path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('isLoggedIn',views.IsLoggedIn.as_view(),name="isLoggedIn"),
    path('yolo', views.Hi.as_view(), name="yolo"),

]