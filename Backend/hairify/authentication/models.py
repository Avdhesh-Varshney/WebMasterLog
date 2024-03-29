from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.timezone import now

class UserManager(BaseUserManager):
    
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.is_staff = True
		user.save()
		return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)  # Add this line
    username = None
    name = models.CharField(max_length=100,default="")
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(default=now)
    objects = UserManager()
    
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.name