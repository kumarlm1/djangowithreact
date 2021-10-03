
from django.contrib import admin
from django.urls import path

from . import views


urlpatterns = [
    # path('a',views.SampleUserView),
    path('',views.QuestionWithExcelCreateView.as_view(),name="myapp"),
    path('tab',views.listTabs),
    path('lession',views.listLessions),
    path("tablession/<int:tpk>",views.listTabLessions),
    path('question/<int:pk>',views.listQuestions),
    path('category',views.listCategorys),
    path('tab/<int:tpk>/<int:lpk>',views.listTabLessionQuestion),
    path('nlession/<int:tpk>',views.listLessionsNecessary),
    path('answer/<int:pk>',views.getAnswer,name="getanswer"),

    path('update/<int:pk>',views.QuestionUpdateView.as_view()),
    path('user',views.UserUpdateView.as_view(),name="userupdate"),
    path('add/lession',views.LessionCreateView.as_view(),name="createlession"),
    path('add/question',views.QuestionWithExcelCreateView.as_view(),name="createquestion"),
    path('add/category',views.CategoryCreateView.as_view(),name="createcategory"),
    path('add/tab',views.TabCreateView.as_view(),name="createtab"),

    
]
