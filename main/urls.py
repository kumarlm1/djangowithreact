
from django.contrib import admin
from django.urls import path

from . import views


urlpatterns = [
    # path('a',views.SampleUserView),
    path('',views.QuestionWithExcelCreateView.as_view(),name="myapp"),
    path('tab',views.listTabs),
    path('lession',views.listLessions),
    path('question/<int:pk>',views.listQuestions),
    path('category',views.listCategorys),
    path('tab/<int:tpk>/<int:lpk>',views.listTabLessionQuestion),
    path('nlession/<int:tpk>',views.listLessionsNecessary),
    path('answer/<int:pk>',views.getAnswer,name="getanswer"),

    path('update/<int:pk>',views.QuestionUpdateView.as_view()),
    path('lessioncreate',views.LessionCreateView.as_view(),name="createlession"),
    path('questioncreate',views.QuestionCreateView.as_view(),name="createquestion"),
    path('categorycreate',views.CategoryCreateView.as_view(),name="createcategory"),

    
]
