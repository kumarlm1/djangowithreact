
from django.contrib import admin
from django.urls import path,include


from reactfrontend.views import SampleReactView,SimpleReactView
app_name = 'djangowithreact'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('main.urls')),
    path('',SimpleReactView),
    path('profile',SampleReactView,name='profile'),
    path('accounts/', include('allauth.urls')),
]
