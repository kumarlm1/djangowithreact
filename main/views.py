from django.shortcuts import render,redirect

# from django.contrib.auth.models import User
from .models import User
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
from django.contrib.auth.mixins import LoginRequiredMixin

from django.http import HttpResponse
from django.views.generic import View

from .utils import render_to_pdf #created in step 4

import reportlab



import io
from django.http import FileResponse
from reportlab.pdfgen import canvas




from django.views.decorators.csrf import csrf_exempt
from twilio.twiml.messaging_response import MessagingResponse

from twilio.rest import Client
from django.conf import settings
account_sid = settings.TWILIO_ACCOUNT_SID
auth_token = settings.TWILIO_AUTH_TOKEN
client = Client(account_sid, auth_token)





@csrf_exempt
def message(request):
    user = request.POST.get('From')
    message = request.POST.get('Body')
    print(f'{user} says {message}')
    print("msg sent")
    response = MessagingResponse()
    # response.message('Thank for your message! A member of our team will be '
    #                  'in touch with you soon.')

    from_whatsapp_number = 'whatsapp:+14155238886'
    to_whatsapp_number = 'whatsapp:+918110001749'

   

    data = {
             'date': 'இது முதல் கேள்வி1 பதில்1 பதில்2 பதில்3 பதில்4 ', 
             'amount': 39.99,
            'customer_name': 'Cooper Mann',
            'order_id': 1233434,}
    pdf = render_to_pdf('main/pdf.html',{"data":data})



    message = client.messages.create(body='Check out this funny picture!',
                       media_url='https://static1.cbrimages.com/wordpress/wp-content/uploads/2016/11/johnny-depp-as-jack-sparrow-in-pirates-of-the-caribbean.jpg',
                       from_=from_whatsapp_number,
                       to=to_whatsapp_number)


    return HttpResponse(str(response))

@csrf_exempt
def status(request):
    user = request.POST.get('To')
    message = request.POST.get('Body')
    print(request.POST.get('MessageStatus'))
    print(f'{user} says {message}')
    
    return HttpResponse('received')
from firebase_admin import auth

import firebase_admin
from firebase_admin import credentials


creds = {
  "type": "service_account",
  "project_id": "explore-81b2d",
  "private_key_id": "f017ccb66a1fa51c8d391873d378aeee782a9519",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZfTC0dD4xWfUF\nlDOuF2FVP/ptyz9HiA0SxGzYSh3IyOYvHpeq6Gd6TE8wzrz99El7rXzCQKPhPCCW\nJP3TjOk9eNU2w+SUuBsfxuv1QBJK5Kl1Ds8v0Qkhi/cM60uW5+dD2mRTG1b4NprP\n3saAl18UuvPTXbxPJ14lcCPkYONBQ/ukDWmIEk99IBCAEaQDBvL5N0HucWXb8/PK\nx3gytNSdudYZQCyGyE0axMQ+PMqA+t1vmFNXjsSoqFYi6GrUpafhhvR9TboGxRgi\nU6nNFVyu3GAYXXLO6i6RH5VWKmP7HtVE5B4pRFsFK8f//S/+1tXVIhwKuZwDTQFN\no6ed5IfdAgMBAAECggEAJUOi/bhRE6mjJtKOzExrO+0bXoaNkBcKjmWjdKe2VLm/\nXuFyATGS0UyT4Pv7O9QIZy2Bi9MBgU0JFFDAQOgK6qJyfdCwsJ6e3yH5OetBdx2Y\nv1rLOxko5FuT99209OVFJcYcnHS5wQuyGN3FyzCkdOvXbSbJZhKLugRt0eqb5YmM\njG7EjxkLXg0j2d1GnFiN+/I/h4/13DZtNSM4vhxogX1FkDiCIfPFC6bGPZpHyeSD\nFSZ9zmbbwCdGOoOQ6EsxWTS8GETF0ToqaDD2D5cJlvdYrW9NY7CUakkjXgIoNT4i\nKPil4mf3hgkd/LjZyMf6MEQUhV1TKvtl46QfivVaoQKBgQDv5m/si3XZ4/ugqhNq\ny95aRg+i4nPWQJDsLMKQXg8oJct/xKM1mBX6Y2T0SmUy2r7YsHtYfxzZQa+EsVGe\njXTA4EJ23NZXPifqXfSEzl/jze46yXcRgvST7AjaJ33zBfjMS/YNFeoBmITFwYZd\nNR/inWPodJpI++Ah8PtQJQ31lQKBgQDoFbkBeDtIgFlmK159NUM3l1vLmUJbJQMz\nIEFHGKxcvu3s+B6cAMcXnS7vhPC0/JBlGVubdetQ5i9R2PXbQngzQWtmdr+zFB8o\nvkyJFsI2VLNVsNdQhHoDXBOdofOigvfEvDkTZldo8ytfw/k9Znra3SMcXigRESuD\nZLpTQKSnKQKBgC415TlbY8gk8kNwf20C+EHLXRezJz0OEtxrgs7sT18caKaj6gxY\nz2L74mZsLjItkLWMyTWyxovS60xUG7S+6s58ZFEhGOiVQHsUvhUW68Gl2U3ZoOXu\no84amVnsYYZ+j/5KY4sBvaGxD2JIdOlfYlT0nFoam92TJwlisgYuHRJBAoGAHfHv\nlQj2XTxyTIR8BJvCuIGHDpYPwcLcztPymEHOu4jHGjRJfsd66MkXLUBx7mhIGUNU\nVpK4cg/BO0ZLMqc46yQdv3LC+VA3VQJ4zZdqJ6h2GzBeF72AIL7YqRYkYWuUnIXM\nt3wU+y2lAw4+MnXulB7EUPy1Hr6gZquwft1wYUECgYAOtgsg+uc/CK1cHEaqDqeS\nugL0wOvHf7meZcL1OU15r5VvEUMKWGQv5S1DOAEIPqppK9wEeloX/XlRf0ER67ZU\nmm5eE0LZVr2cM+Yl7Dr/HjbTzIZLAwDX/5pQM0t6yivKcK6CVr4mSPWrF2GEa/XN\npcJriohH5TDo3ZoYezFkXg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-e1edf@explore-81b2d.iam.gserviceaccount.com",
  "client_id": "109671190365508945547",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e1edf%40explore-81b2d.iam.gserviceaccount.com"
}




# cred = credentials.Certificate(creds)
# firebase_admin.initialize_app(cred)

try:
    app = firebase_admin.get_app()
except ValueError as e:
    cred = credentials.Certificate(creds)
    firebase_admin.initialize_app(cred)


import json
@csrf_exempt
@login_required()
def PhoneVerified(request):
    

    if request.method == 'POST':
        print(request.POST)
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        phone = data['phone']
        print(phone)
        if request.user.is_authenticated:
            print(request.user.email)
            try: 
                usr = auth.get_user_by_phone_number(phone)
                user = User.objects.get(email=request.user.email)
                try:
                    user.isVerifiedMobile = True
                    user.phone = phone
                    user.save()
                    return JsonResponse({'result':'success'},status=201)
                except:
                    return JsonResponse({'result':'error'},status=200)


            except:
                usr = 'no user'
            print('Successfully fetched user data: {0}'.format(usr))
        
        return JsonResponse({'result':'error'},status=401)
    return JsonResponse({'result':'error'},status=405)  
     
      
         


    return HttpResponse('invalid Method') 


def phoneVerify(request):
    return render(request,'main/phoneverify.html')





def some_view(request):

    buffer = io.BytesIO()


    p = canvas.Canvas(buffer)

    # Draw things on the PDF. Here's where the PDF generation happens.
    # See the ReportLab documentation for the full list of functionality.
    html = 'இது முதல் கேள்வி1 பதில்1 பதில்2 பதில்3 பதில்4'
    html=html.encode()
    p.drawString(10, 10,html)

    # Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    return HttpResponse(buffer,content_type='application/pdf')
    return FileResponse(buffer, as_attachment=True, filename='hello.pdf')
    


class GeneratePdf(View):
    def get(self, request, *args, **kwargs):
        data = {
             'date': 'இது முதல் கேள்வி1 பதில்1 பதில்2 பதில்3 பதில்4 ', 
             'amount': 39.99,
            'customer_name': 'Cooper Mann',
            'order_id': 1233434,
        }
        pdf = render_to_pdf('main/pdf.html',{"data":data})
        mms_media = MMSMedia(
            filename='scscs',
            mime_type='application/pdf',
            content=pdf)
        print(mms_medis)
        return HttpResponse(pdf, content_type='application/pdf')







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
        #form1 = UserUpdateForm(request.POST)
          
        if form.is_valid():
                user = form.save()
                update_session_auth_hash(request, user)  # Important!
                messages.success(request, 'Your password was successfully updated!')
                return render(request, 'userprofile/index.html', {'form1': form })
            
        else:
                messages.error(request, 'Please correct the error below.')
                return render(request, 'userprofile/index.html', {'form1': form })     
    else:
        form1 = PasswordChangeForm(request.user)
        # form = UserUpdateForm(instance=request.user)

        return render(request, 'userprofile/index.html', {'form1': form1 })


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
    form_class = UserUpdateForm
    
    #fields = ['username','first_name','last_name','email','last_login','date_joined']
    template_name = "userprofile/index.html"
    login_url = '/accounts/login/'
    success_url = '/api/user'
    def get_object(self):
        return User.objects.get(email=self.request.user.email)
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = User.objects.get(email=self.request.user.email)
        form = PasswordChangeForm(self.request.user)
        if 'old_password' in context['form'].fields:
            context['form1'] = context['form']
            context['active'] = 2
            context['form'] = UserUpdateForm(instance=self.request.user)
        else:
            context['active'] = 1
            context['form1'] = form 
              
        context["name"] = self.__class__.__name__
        return context   
    def post(self, request, *args, **kwargs):

        # get the user instance
        self.object = self.get_object()
        print(request.POST)
        if not 'old_password' in request.POST:

            
            form_class= self.form_class
            form = self.get_form(form_class)
            form_name = 'form'
            # get the primary form
            

        else:
        
            form = PasswordChangeForm(self.request.user,self.request.POST)
            form_name = 'form'

        if form.is_valid():
            print("saved")
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

        return self.render_to_response(self.get_context_data(form=form))
        # def form_invalid(self, form, **kwargs):
        #     return self.render_to_response(self.get_context_data(form=form))     
def listCategorys(request):

    data = list(Category.objects.all().values('id','name','description'))
    
    return JsonResponse({'result':data},safe=False)


def listLessions(request):
    if request.user.is_authenticated:
        user = User.objects.get(email=request.user.email)
        data = list(Lession.objects.all().values('id','name','division__name','description').order_by('division'))
    
    return JsonResponse({'result':data},safe=False)
import time
def listQuestions(request,pk):
    time.sleep(3)
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