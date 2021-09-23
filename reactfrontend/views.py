from django.shortcuts import render

from django.contrib.auth.models import User
# Create your views here.


def SimpleReactView(request):
    return render(request,'reactfrontend/index1.html')
def SampleReactView(request):
    return render(request,'reactfrontend/index.html')