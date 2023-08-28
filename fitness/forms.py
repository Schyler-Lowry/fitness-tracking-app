from django import forms
from .models import WeightEntry
from datetime import datetime
from bootstrap_datepicker_plus.widgets import DateTimePickerInput, TimePickerInput


from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Submit


class WeightEntryForm(forms.ModelForm):
    """add weight entry form"""

    class Meta:
        model = WeightEntry
        fields = ("weight", "recorded", "note")
        widgets = {
            'recorded': DateTimePickerInput(),
            'weight': forms.TextInput(attrs={'maxlength': "5", "onkeypress": "return isNumberKey(event)", "required": ""}),
            'note': forms.TextInput(attrs={'type': 'text'}),
        }

        # options={"format": "HH:mm MM/DD/YYYY"}
        # options={"format": "MM/DD/YYYY %I:%M %p"}


class WeightEntryEditForm(forms.ModelForm):
    """edit weigh entry form"""

    class Meta:
        model = WeightEntry
        fields = ("weight", "recorded", "note")
        widgets = {
            'recorded': DateTimePickerInput(),
            'weight': forms.TextInput(attrs={'maxlength': "5", "onkeypress": "return isNumberKey(event)", "required": ""}),
            'note': forms.TextInput(attrs={'type': 'text'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.layout = Layout(
            Fieldset('note', id="MYFORM_id",
                     css_class="form-control", title="noteForm")
        )
