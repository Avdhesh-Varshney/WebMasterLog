import os
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from django.http import HttpResponse

from rest_framework.views import APIView
from django.http import StreamingHttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import cloudinary
import cloudinary.uploader

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import PostgresChatMessageHistory
from langchain_core.messages import HumanMessage
from .utils import TextInputAi
from django.views.decorators.csrf import csrf_exempt
from langchain_core.output_parsers import JsonOutputParser



from .models import report,chats
from authentication.models import User
from .serializers import ReportSerializer
class Hi(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self,request):
        print(request.auth)
        token = request.auth
        jwt_auth = JWTAuthentication()
        data = jwt_auth.authenticate(request)
        print(data)
        return Response("YOLO")


class ChatView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        try:
            print(request)
            user = request.user
            print("this is",user.id)

            message = request.data.get('message') 
            print(message)

            a_response = TextInputAi(message, str(user.id)) 

            if a_response:
                def event_stream():
                    s = ""
                    for chunk in a_response:
                        s += chunk.content + '\n'
                        yield "data: {}\n\n".format(chunk)
                
                response = StreamingHttpResponse(event_stream(), content_type='text/event-stream')
                return response
            else:
                return Response("Invalid data", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"An error occurred: {e}")
            return Response("Failed", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def hi(request):
    user_id = request.user.id
    return Response("yes"+str(user_id))

@api_view(['POST'])

@permission_classes([IsAuthenticated])
def historyMessages(request):
    user_id = request.user.id
    print(user_id)
    postgres_url = str(os.getenv("POSTGRE_URI"))
    message = PostgresChatMessageHistory(connection_string = postgres_url,
        session_id=str(user_id))
    filter_message = []
    for i in message.messages:
        dict = {"content": i.content,"type":i.type}
        filter_message.append(dict)
    serialized_data = {
        "messages": filter_message  # Assuming you have a method to fetch messages
    }
    
    return Response(serialized_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def imageInput(request):

#     and when the user send request please make sure to send data like
# {"message":"https://th.bing.com/th/id/OIP.FXBuJ8RmUJkOTSC-qd-M6wHaEK?rs=1&pid=ImgDetMain", "id": 69}
    try:
        id = request.user.id
        image = request.FILES['image']
        upload_result = cloudinary.uploader.upload(image, folder="hairfall")
        picture_url = upload_result['secure_url']

        llm = ChatGoogleGenerativeAI(model="gemini-pro-vision") 
        
        message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": "you are an ai assistant, write an essay on the image",
            },  # You can optionally provide text parts
            {"type": "image_url", "image_url": picture_url},
        ]
        )
        # parser = JsonOutputParser()
        # chain =  llm | parser
        result = llm.invoke([message])  
        
        res = result.content
        rp = report.objects.create(user_id=id,image_url=picture_url,report=res)
        rp.save()
        print(rp)
        return Response({"img":picture_url,"analysis":result.content})
    except Exception as e:
        print(e)
        return Response("Failed",status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetReport(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):

        try:
            user_id = request.user.id
            print("this is",user_id)
            reports = report.objects.filter(user_id=user_id)
            serializedreport = ReportSerializer(reports, many = True)

            return Response(serializedreport.data)
        
        except Exception as e:
            print(e)
            return Response("Failed",status=status.HTTP_500_INTERNAL_SERVER_ERROR)






