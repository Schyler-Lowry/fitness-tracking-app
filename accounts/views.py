from typing import Any
from django.db import models
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView
from django.views.generic.edit import UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


from datetime import datetime
from fitness.forms import WeightEntryForm
from fitness.views import WeightEntryPostView
from fitness.models import WeightEntry

class SignUpView(CreateView):
    """signup view"""
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"

class UserProfileView(LoginRequiredMixin, DetailView):
    """user's profile view"""
    model = CustomUser
    template_name = "registration/user_profile.html"
    paginate_by = 10
    # queryset = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")

    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(UserProfileView, self).get_context_data(**kwargs)

        if self.request.user.is_authenticated:
            postlist = WeightEntry.objects.all().filter(user=self.kwargs["pk"]).order_by("-recorded", "-updated","-created")
        else:
            postlist = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")
        context["postlist"] = postlist
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        return context
    
class UserWeightEntryListView(LoginRequiredMixin, ListView):
    """user's profile view"""
    model = WeightEntry
    template_name = "registration/user_entry_list.html"
    paginate_by = 10
    # queryset = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")

    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(UserWeightEntryListView, self).get_context_data(**kwargs)
        customuser = CustomUser.objects.get(id=self.kwargs["pk"])
        if self.request.user.is_authenticated:
            postlist = WeightEntry.objects.all().filter(user=self.kwargs["pk"]).order_by("-recorded", "-updated","-created")
        else:
            postlist = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")
        context["postlist"] = postlist
        context["customuser"] = customuser
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        return context
    
    def get_queryset(self):
        queryset = super(UserWeightEntryListView, self).get_queryset()
        if self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.kwargs["pk"]).order_by("-recorded", "-updated","-created")
        else:
            queryset = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")
        return queryset
    
    

class UserProfileChangeView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    """view for changing user profile info"""
    form_class = CustomUserChangeForm
    model = CustomUser
    #success_url = reverse_lazy("user_profile")
    template_name = "registration/user_change_profile.html"
    
    def test_func(self):
        obj = self.get_object()
        return obj.pk == self.request.user.pk
    
    def get_context_data(self, **kwargs):
        context = super(UserProfileChangeView, self).get_context_data(**kwargs)
        context["form1"] = WeightEntryForm(initial={'recorded': datetime.now()})
        
        return context