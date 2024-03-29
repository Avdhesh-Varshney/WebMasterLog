from django.db import models
from django.utils import timezone
# from cloudinary_storage.models import CloudinaryField
# from django.contrib.auth.models import User
from django.conf import settings
from cloudinary.models import CloudinaryField


# Create your models here.
class chats(models.Model):
    message=models.CharField(max_length=5000)
    userid = models.IntegerField(default = 1)
    timestamp = models.DateTimeField(default=timezone.now)
    isresp = models.BooleanField(default=False)
    image = CloudinaryField(null = True)

    # def __str__(self):
    #     return self.username
class chats_with_img(models.Model):
    userid = models.IntegerField()
    timestamp = models.DateTimeField(default=timezone.now)
    image = CloudinaryField()

class report(models.Model):
    user_id=models.IntegerField(null=False,default=1)
    image_url=models.CharField(null=True)
    report=models.TextField(null=True)
    created_at = models.DateTimeField(default=timezone.now)

    