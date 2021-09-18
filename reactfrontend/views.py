from django.shortcuts import render

from django.contrib.auth.models import User
# Create your views here.

def SampleReactView(request):
    return render(request,'reactfrontend/index.html')