from io import BytesIO
import os 
from django.shortcuts import render
from rest_framework.decorators import api_view
# from langchain.memory import PostgresChatMessageHistory
from langchain_community.chat_message_histories import (
    PostgresChatMessageHistory,
)
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables.history import RunnableWithMessageHistory
# from xhtml2pdf import pisa



def TextInputAi(message , id):

    prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Suppose you a Hair and Scalp Related problems' ai named HairifyAI, instead of Gemini AI. You suggest advice for your patients. Answer like e humanoid chat assistant with a cheerful tone. Only use English language. Reply in aprox 150 words.",
        ),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{input}"),
    ]
    )
    
    # print(history.messages)

    postgres_url = str(os.getenv("POSTGRE_URI"))

    model = ChatGoogleGenerativeAI(model="gemini-pro",convert_system_message_to_human=True,temperature=0)

    runnable = prompt | model
    
    chain_with_history = RunnableWithMessageHistory(
    runnable,
    lambda session_id: PostgresChatMessageHistory(
        connection_string = postgres_url,
        session_id=session_id
    ),
    input_messages_key="input",
    history_messages_key="history",
    )

    config = {"configurable": {"session_id": id}}
    

    # llm_chain = LLMChain(llm=,memory=history.messages, prompt="")
    # result_generator = llm.stream(message )
    # result_generator = llm_chain.stream(message )
    result_generator = chain_with_history.stream({"input": message},config=config)
    # print("this is ", result_generator)
    

    return result_generator
