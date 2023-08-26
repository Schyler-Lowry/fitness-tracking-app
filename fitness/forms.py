from django import forms
from .models import WeightEntry
from datetime import datetime
from bootstrap_datepicker_plus.widgets import DateTimePickerInput, TimePickerInput





class WeightEntryForm(forms.ModelForm):
    """add weight entry form"""
    
    class Meta:
        model = WeightEntry
        fields = ("weight", "recorded", "note")
        widgets = {
            'recorded': DateTimePickerInput(),
            'weight': forms.TextInput(attrs={'maxlength': "5", "onkeypress": "return isNumberKey(event)", "required":""})
        }


        #options={"format": "HH:mm MM/DD/YYYY"}
        #options={"format": "MM/DD/YYYY %I:%M %p"}


class WeightEntryEditForm(forms.ModelForm):
    """edit weigh entry form"""
    
    
    class Meta:
        model = WeightEntry
        fields = ("weight", "recorded", "note")
        widgets = {
            'recorded': DateTimePickerInput(),
            'weight': forms.TextInput(attrs={'maxlength': "5", "onkeypress": "return isNumberKey(event)", "required":""}),
            'note': forms.TextInput(attrs={'type': 'text'}),
        }