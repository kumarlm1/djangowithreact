from django.shortcuts import render,redirect

from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
# Create your views here.


def SimpleReactView(request):
    if request.user.is_authenticated:
        response = redirect('/profile')
        return response
    return render(request,'reactfrontend/index1.html')
@login_required(login_url='/accounts/login/')
def SampleReactView(request):
    return render(request,'reactfrontend/index.html')