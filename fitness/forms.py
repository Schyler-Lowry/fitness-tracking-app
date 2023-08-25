from django import forms
from .models import WeightEntry
from datetime import datetime

class MyDateInput(forms.DateTimeInput):
    input_type ='date'

# class YourForm(forms.ModelForm):
#     publishDate = forms.DateField(widget=MyDateInput(attrs={'class':'form-control'}))
#     class Meta:
#         model = YourModel
#         fields = ('publishDate')



class WeightEntryForm(forms.ModelForm):
    """comment form"""
    #recorded = forms.DateField(widget=MyDateInput(attrs={'class':'form-control'}))
    
    class Meta:
        model = WeightEntry
        fields = ("weight", "recorded")
        widgets = {
            'recorded': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
            'weight': forms.TextInput(attrs={'maxlength': "5", "onkeypress": "return isNumberKey(event)", "required":""}) 
        }


        # def get_now():
        #     return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        


        # widgets = {
        #     'recorded': forms.DateTimeField(attrs={'placeholder': 'Write your reply, in 140 characters or less.'})
        # }

