
from django.contrib import admin
from django.urls import path,include


from reactfrontend.views import SampleReactView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('main.urls')),
    path('',SampleReactView),
]
