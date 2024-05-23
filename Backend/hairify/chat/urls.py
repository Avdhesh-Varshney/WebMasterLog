from django.urls import path
from . import views

urlpatterns = [
 
    path('chat', views.ChatView.as_view(), name="chats"),
    path('report', views.imageInput, name="report"),
    path('yo', views.hi, name="yep"),

    path('chat/history',views.historyMessages,name="history"),

    path('reporthistory',views.GetReport.as_view(), name="reporthistory"),


]