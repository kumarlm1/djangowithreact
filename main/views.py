from django.shortcuts import render

from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.views.generic import CreateView,UpdateView
import openpyxl
from django.views import View
from django.db.models import CharField
from django.db.models.functions import Substr

from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm

from .forms import QuestionForm,LessionForm,UserUpdateForm
from .models import Lession,Question,Category,Tab
from django.contrib.auth.decorators import login_required
# Create your views here.
from django.contrib.auth.mixins import LoginRequiredMixin
def CreateQuestionFromExcel(request,lession,tabs):
    les = [ i.id for i in lession]
    tab = [ i.id for i in tabs]
    print(les,tab)

    try:
        excel_file = request.FILES["excel_file"]
        wb = openpyxl.load_workbook(excel_file)


        worksheet = wb.active
        for row in worksheet.iter_rows():
            data=list()
            for cell in row:
                if( cell.value != None):
                    data.append(str(cell.value))   
            if(len(data) == 2):
                try:  
                      
                    pks,isCreated = Question.objects.get_or_create(question=data[0],answer=data[1])
                    print(pks)
                    if isCreated:
                        print("create")
                       
                    # qns = Question.objects.get(pk=pks)
                    print(pks) 
                    pks.lession.add(*les)
                    pks.tab.add(*tab)
                except :   
                    print('Already exist') 
            else:
                print('Empty cell')        
    except:
        print('error')



def SampleUserView(request):
    return render(request,'main/index.html')
class LessionCreateView(LoginRequiredMixin,CreateView):
    model = Lession
    form_class = LessionForm
    initial = {}
    login_url = '/accounts/login/'
    template_name = 'main/create.html'
    def get_form_kwargs(self):
        kwargs = super(LessionCreateView, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs


# class LessionCreateView(LoginRequiredMixin,CreateView):
#     model = Lession
#     fields = '__all__'
#     template_name = "main/create.html"
#     login_url = '/accounts/login/'
#     success_url = '/lession'
#     def form_valid(self, form):
#         form.instance.useremail = self.request.user.email
#         self.object = form.save(commit=False)
#         self.object.save()
#         return HttpResponseRedirect(self.get_success_url())
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
        
#         context["name"] = self.__class__.__name__
#         return context

def listTabLessions(request,tpk):
    if request.user.is_authenticated:
        try:
            tab = Tab.objects.get(pk=tpk)
            isOwner = (tab.useremail == request.user.email )
            if isOwner:
                data = list(tab.lession_set.all().values('id','name','division__name','description').order_by('division'))
        except:
            data = 'no such tab'
        
    else:
        tab = Tab.objects.get(pk=tpk)
        data = list(tab.lession_set.all().values('id','name','division__name','description').order_by('division'))
    return JsonResponse({'result':data},safe=False)


class CategoryCreateView(LoginRequiredMixin,CreateView):
    model = Category
    fields = ['name','description']
    template_name = "main/create.html"
    login_url = '/accounts/login/'
    success_url = '/category'
    def form_valid(self, form):
        form.instance.useremail = self.request.user.email
        self.object = form.save(commit=False)
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context        


def PasswordResetWithOldPass(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('change_password')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'userprofile/index.html', {'form': form})


class QuestionWithExcelCreateView(LoginRequiredMixin,View):
    form_class = QuestionForm
    initial = {}
    login_url = '/accounts/login/'
    def get(self,request,tpk=None,lpk=None):
        form = self.form_class(initial=self.initial,request=self.request)
        if tpk and lpk == None:
            return render(request, 'main/uploadquestion.html', {'form':form})
        return render(request, 'main/uploadquestion.html', {'form':form , 'tab':tpk , 'lession':lpk })
    def post(self,request):
        form = self.form_class(request.POST,request=self.request)
        if form.is_valid():
            if (form.cleaned_data['question'].strip() != '' and form.cleaned_data['answer'].strip() != ''):
                form.save()
            else:    
                lession=form.cleaned_data['lession']
                tabs = form.cleaned_data['tab']
                CreateQuestionFromExcel(request,lession,tabs)

        return HttpResponseRedirect('/api/add/question')    


class TabCreateView(LoginRequiredMixin,CreateView):
    model = Tab
    fields = ['name','description']
    template_name = "main/create.html"
    login_url = '/accounts/login/'
    success_url = '/api/add/tab'
    def form_valid(self, form):
        print('happening2')
        form.instance.useremail = self.request.user.email
        self.object = form.save(commit=False)
        self.object.save()
        return HttpResponseRedirect(self.get_success_url())

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context
def listTabs(request):
    
    if request.user.is_authenticated:
        user = User.objects.get(email=request.user.email)
        data = list(Tab.objects.filter(useremail__exact=request.user.email).values())
    
        return JsonResponse({'result':data},safe=False)
    data = list(Tab.objects.all().values())
    
    return JsonResponse({'result':data},safe=False)          


class QuestionUpdateView(LoginRequiredMixin,UpdateView):
    model = Question
    fields = '__all__'
    template_name = "main/update.html"
    login_url = '/accounts/login/'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context["name"] = self.__class__.__name__
        return context

class UserUpdateView(LoginRequiredMixin,UpdateView):
    model = User
    fields = ['username','first_name','last_name','email','last_login','date_joined']
    template_name = "userprofile/index.html"
    login_url = '/accounts/login/'
    success_url = '/api/user'
    def get_object(self):
        return User.objects.get(email=self.request.user.email)
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        form = PasswordChangeForm(self.request.user)
        context['form1'] = form
        context["name"] = self.__class__.__name__
        return context


def listCategorys(request):

    data = list(Category.objects.all().values('id','name','description'))
    
    return JsonResponse({'result':data},safe=False)


def listLessions(request):
    if request.user.is_authenticated:
        user = User.objects.get(email=request.user.email)
        data = list(Lession.objects.all().values('id','name','division__name','description').order_by('division'))
    
    return JsonResponse({'result':data},safe=False)

def listQuestions(request,pk):
    lession = Lession.objects.get(pk=pk)
    data = list(Question.objects.filter(lession__exact=lession).values('id','question','answer'))
    
    return JsonResponse({'result':data},safe=False)

     

def listTabLessionQuestion(request,tpk,lpk):
    tab = Tab.objects.get(pk=tpk)
    lession = Lession.objects.get(pk=lpk)
    data = list(Question.objects.filter(lession__exact=lession).filter(tab__exact=tab).values('id','question',answers=Substr('answer',1,20)) )
    return JsonResponse({'result':data},safe=False) 
@login_required
def listLessionsNecessary(request,tpk):
    tab = Tab.objects.get(pk=tpk)
    data = list(Lession.objects.filter(tabs__exact=tab).values('id','name','division__name','description'))
    
    return JsonResponse({'result':data},safe=False)    

def getAnswer(request,pk):

    data = list(Question.objects.filter(pk__exact=pk).values('id','answer'))
 
    return JsonResponse({'result':data},safe=False)  