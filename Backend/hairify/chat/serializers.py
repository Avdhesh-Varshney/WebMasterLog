from rest_framework.serializers import ModelSerializer
from .models import chats , chats_with_img, report

class ChatSerializer(ModelSerializer):
    class Meta:
        model = chats
        fields = '__all__'

    def create(self, validated_data):
        achat = chats.objects.create(message=validated_data['message'])
        achat.save()
        return achat

class ReportSerializer(ModelSerializer):
    class Meta:
        model = report
        fields = '__all__'