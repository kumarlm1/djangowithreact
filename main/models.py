from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.urls import reverse
from django.contrib.auth.models import User
# Create your models here.
class Category(models.Model):
    useremail = models.EmailField(max_length=254,null=False)
    name = models.CharField(max_length=10,unique=True)
    description = models.CharField(max_length=250)

    def __str__(self):
        return self.name 
    def get_absolute_url(self):
        return reverse("createcategory")


class Tab(models.Model):
    useremail = models.EmailField(max_length=254,null=False)
    name = models.CharField(max_length=50,null=False,blank=False)
    description = models.TextField(blank=True,null=True)
    
    class Meta:
        unique_together = ['name']
        

    def __str__(self):
        return '{0} - {1}'.format(self.pk,self.name)

class Lession(models.Model):
    tabs = models.ManyToManyField(Tab)
    name =  models.CharField(max_length=250)  
    description = models.TextField(null=True,blank=True)
    division = models.ForeignKey(Category,on_delete=models.CASCADE)
    
    @property
    def getdivision(self):
        return self.division.name
    @property
    def getqnscount(self):
        return Question.objects.filter(lession__exact=self).count()   
    class Meta:    
        unique_together = ['name','division']
    def __str__(self):
        return f'{self.name} || {self.division.name}'
    def get_absolute_url(self):
        return reverse("createlession")
        
class Question(models.Model):
    
    tab = models.ForeignKey(Tab,on_delete=models.CASCADE,blank=False,default=1)
    lession = models.ForeignKey(Lession,on_delete=models.CASCADE,blank=False,default=1)
    question = models.TextField(blank=True)
    answer = models.TextField(blank=True)
    

    class Meta:
        unique_together=['question','answer']
    def __str__(self):
        return self.question

    def get_absolute_url(self):
        return reverse("createquestion")
        
        
# class Setup(models.Model):
#         user = models.ForeignKey(User,on_delete=models.CASCADE)
#         name = models.CharField(max_length=250)
#         description = models.TextField(blank=True,null=True)
#         #tabs = models.ManyToManyField(Tab)

#         class Meta:
#             unique_together = ['user','name']
#             ordering = ['name']

#         def __str__(self):
#             return self.name        




