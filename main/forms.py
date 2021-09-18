from django.forms import ModelForm,Textarea
from .models import Question


class QuestionForm(ModelForm):
    
    class Meta:
        model = Question
        widgets = {
          'question': Textarea(attrs={'rows':2, 'cols':50}),
          'answer': Textarea(attrs={'rows':2, 'cols':50}),
        }
        fields = '__all__'