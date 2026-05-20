from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
import torch
from functools import partial

# Parchear torch.load ANTES de importar TTS
_original_load = torch.load
torch.load = partial(_original_load, weights_only=False)

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
import os
import torchaudio
from TTS.api import TTS

device = "cuda" if torch.cuda.is_available() else "cpu"
tts = None

if os.environ.get("RUN_MAIN") == "true":
    print("Cargando TTS...")
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        try:
            serializer = TaskSerializer(data=request.data)
            print(request.data)
            if serializer.is_valid():
                serializer.save()

                if(request.data["voz"] == "Susana"):
                    # speaker = "api/Susana2Lento.wav"
                    speaker = "api/Grabación (30).wav"
                elif(request.data["voz"] == "Cuba"):
                    speaker = "api/vozcubanamejorcalidad.wav"

                tts.tts_to_file(
                    text=serializer.data["description"],
                    speaker_wav=speaker,
                    language="es",
                    speed=0.25,
                    file_path="media/cubasample.wav"
                )
                print("✅ Audio generado")
                print("✅ Guardado en BD")
        
                return Response({
                    "task": serializer.data,
                    "audio_url": request.build_absolute_uri("/media/cubasample.wav"),
                })

            print("❌ Serializer error:", serializer.errors)
            return Response(serializer.errors)

        except Exception as e:
            print("💥 ERROR:", str(e))
            return Response({"error": str(e)})


@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
