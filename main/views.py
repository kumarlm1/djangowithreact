from django.shortcuts import render

from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.views.generic import CreateView,UpdateView
import openpyxl
from django.views import View
from django.db.models import CharField
from django.db.models.functions import Substr

from .forms import QuestionForm
from .models import Lession,Question,Category,Tab
# Create your views here.

def index(request,lession,tab):
    try:
        excel_file = request.FILES["excel_file"]
        wb = openpyxl.load_workbook(excel_file)


        worksheet = wb.active
        for row in worksheet.iter_rows():
            data=list()
            for cell in row:
                data.append(str(cell.value))
            try:    
                Question.objects.create(lession=lession,tab=tab,question=data[0],answer=data[1]).save()
            except :   
                print('Already exist') 
    except:
        print('error')



def SampleUserView(request):
    return render(request,'main/index.html')


class LessionCreateView(CreateView):
    model = Lession
    fields = '__all__'
    template_name = "main/create.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context

class CategoryCreateView(CreateView):
    model = Category
    fields = '__all__'
    template_name = "main/create.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context        

class QuestionWithExcelCreateView(View):
    form_class = QuestionForm
    initial = {}
    def get(self,request):
        form = self.form_class(initial=self.initial)
        return render(request, 'main/index1.html', {'form':form})
    def post(self,request):
        form = self.form_class(request.POST)
        if form.is_valid():
            if (form.cleaned_data['question'].strip() != '' and form.cleaned_data['answer'].strip() != ''):
                form.save()
            lession=form.cleaned_data['lession']
            tab = form.cleaned_data['tab']
            index(request,lession,tab)

        return HttpResponseRedirect('/')    


class QuestionCreateView(CreateView):
    model = Question
    fields = '__all__'
    template_name = "main/create.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context

class QuestionUpdateView(UpdateView):
    model = Question
    fields = '__all__'
    template_name = "main/update.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context




def listCategorys(request):

    data = list(Category.objects.all().values('id','name','description'))
    
    return JsonResponse({'result':data},safe=False)


def listLessions(request):

    data = list(Lession.objects.all().values('id','name','division__name','description').order_by('division'))
    
    return JsonResponse({'result':data},safe=False)

def listQuestions(request,pk):
    lession = Lession.objects.get(pk=pk)
    data = list(Question.objects.filter(lession__exact=lession).values('id','question','answer'))
    
    return JsonResponse({'result':data},safe=False)

def listTabs(request):
    data = list(Tab.objects.all().values())
    
    return JsonResponse({'result':data},safe=False)        

def listTabLessionQuestion(request,tpk,lpk):
    tab = Tab.objects.get(pk=tpk)
    lession = Lession.objects.get(pk=lpk)
    data = list( Question.objects.filter(lession__exact=lession).filter(tab__exact=tab).values('id','question',answers=Substr('answer',1,20)) )
    return JsonResponse({'result':data},safe=False) 

def listLessionsNecessary(request,tpk):

    data = list(Lession.objects.all().filter(getqnscount__gte=1).values('id','name','division__name','description'))
    
    return JsonResponse({'result':data},safe=False)    

def getAnswer(request,pk):

    data = list(Question.objects.filter(pk__exact=pk).values('id','answer'))
 
    return JsonResponse({'result':data},safe=False)  