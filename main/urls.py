
from django.contrib import admin
from django.urls import path

from . import views
# from .utils import HelloPDFView

urlpatterns = [
    # path('a',views.SampleUserView),
    path('',views.QuestionWithExcelCreateView.as_view(),name="myapp"),
    path('pdf',views.GeneratePdf.as_view()),
    path('report',views.some_view),
    path('message',views.message),
    path('status',views.status),
    path('verifiedd',views.phoneVerify),
    path('verified',views.PhoneVerified,name="verified"),
    path('deregister',views.PhoneDeVerify,name="deverify"),
    
    path('tab',views.listTabs,name="list_tab"),
    path('lession',views.listLessions,name="list_lession"),
    path("tablession/<int:tpk>",views.listTabLessions),
    path('question/<int:pk>',views.listQuestions),
    path('category',views.listCategorys),
    path('tab/<int:tpk>/<int:lpk>',views.listTabLessionQuestion,name="list_tab_question"),
    path('nlession/<int:tpk>',views.listLessionsNecessary),
    path('answer/<int:pk>',views.getAnswer,name="getanswer"),
    path('pass',views.PasswordResetWithOldPass,name="pass"),

    path('update/<int:pk>',views.QuestionUpdateView.as_view()),
    path('user',views.UserUpdateView.as_view(),name="userupdate"),
    path('add/lession',views.LessionCreateView.as_view(),name="createlession"),
    path('add/question',views.QuestionWithExcelCreateView.as_view(),name="createquestion"),
    path('add/question/<int:tpk>/<int:lpk>',views.QuestionWithExcelCreateView.as_view(),name="createquestion"),
    path('add/category',views.CategoryCreateView.as_view(),name="createcategory"),
    path('add/tab',views.TabCreateView.as_view(),name="createtab"),

    
]
