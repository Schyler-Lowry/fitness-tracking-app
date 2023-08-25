from django.db import models
from django.conf import settings
from django.urls import reverse
# Create your models here.

class WeightEntry(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="weight_entries"
    )
    weight = weight = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=1)
    recorded = models.DateTimeField(blank=True, null=True, help_text="Enter the date and time when you measured this weight.")
    note = models.TextField(blank=True, null=True,help_text="Optional: Add a note regarding this entry.")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        """string method"""
        return "Entry {} by {}".format(self.pk, self.user)
            
    
    # def get_absolute_url(self):
    #     """get entry url based on pk"""
    #     return reverse("entry_detail", kwargs={'pk': self.pk})

    