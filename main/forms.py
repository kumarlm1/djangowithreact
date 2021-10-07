from django.forms import ModelForm,Textarea,Form,ModelMultipleChoiceField
from .models import Question,Tab,Lession,Category
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm



class UserUpdateForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(UserUpdateForm, self).__init__(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        if instance and instance.pk:
            self.fields['last_login'].widget.attrs['readonly'] = True
    class Meta:
        model = User
        fields = ['username','first_name','last_name','last_login']
        

class CustomLessionLabel(forms.ModelMultipleChoiceField):
    def label_from_instance(self, member):
        return "%s" % member.name
class QuestionForm(ModelForm):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request')
        super(QuestionForm, self).__init__(*args, **kwargs)
        
        self.fields['tab'].queryset = Tab.objects.filter(
            useremail=self.request.user.email)    
        tabsquery = Tab.objects.filter(
            useremail=self.request.user.email)     
        self.fields['lession'].queryset = Lession.objects.filter(tabs__in = tabsquery).distinct()
    class Meta:
        model = Question
        widgets = {
          'question': Textarea(attrs={'rows':1, 'cols':50}),
          'answer': Textarea(attrs={'rows':1, 'cols':50}),
        }
        fields = '__all__'
    lession = CustomLessionLabel(
        queryset=None,
        widget=forms.SelectMultiple(attrs={ 'id' : 'lession' , 'class':'choices-multiple', 'style': "max-width:90%;"}),) 
    tab = CustomLessionLabel(
        queryset=None,
        widget=forms.SelectMultiple(attrs={ 'id' : 'tab' ,'class':'choices-multiple', 'style': "max-width:90%;"}),)
class LessionForm(ModelForm):
    
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request')
        super(LessionForm, self).__init__(*args, **kwargs)
        self.fields['tabs'].queryset = Tab.objects.filter(
            useremail=self.request.user.email)
        self.fields['division'].queryset = Category.objects.filter(
            useremail=self.request.user.email)
    class Meta:
        model = Lession
        # widgets = {
        #   'tabs': forms.CheckboxSelectMultiple(choices=Tab.objects.filter(useremail__exact='lali.1817129@gct.ac.in'))

        # }
        fields = '__all__'
    tabs = CustomLessionLabel(
        queryset=None,
        widget=forms.SelectMultiple(attrs={ 'id' : 'choices-multiple-remove-button' , 'style': "max-width:90%;"}),
       )
        
    division = forms.ModelChoiceField(empty_label=None,queryset=None,widget=forms.Select(attrs={ 'class' : 'form-select'})) 





