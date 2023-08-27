from typing import Optional
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.utils.safestring import mark_safe

from datetime import datetime

from django.contrib import messages

from django.shortcuts import redirect
from django.http import Http404, JsonResponse
from django.views import View
from django.views.generic import ListView, DetailView, FormView, TemplateView
from django.views.generic.detail import SingleObjectMixin

from django.views.generic.edit import UpdateView, DeleteView, CreateView, FormMixin
from django.urls import reverse_lazy, reverse

from .models import WeightEntry
from .forms import WeightEntryForm, WeightEntryEditForm

class TemplateView(LoginRequiredMixin, TemplateView):
    template_name="home.html"

class WeightEntryListView(ListView):
    model = WeightEntry
    template_name = "home.html"
    paginate_by = 10
    # queryset = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")
    def get_queryset(self):
        queryset = super(WeightEntryListView, self).get_queryset()
        if self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.request.user).order_by("-recorded", "-updated","-created")
        else:
            queryset = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")
        return queryset
    

    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)
    
   
    
    def get_context_data(self, **kwargs):
        context = super(WeightEntryListView, self).get_context_data(**kwargs)
        weight_entry_list = WeightEntry.objects.all()
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        context["weight_entry_list"] = weight_entry_list
        return context

class WeightEntryDetailView(DetailView):
    model = WeightEntry
    template_name = "weight_entry_detail.html"
    
    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)
    
   
    
    def get_context_data(self, **kwargs):
        context = super(WeightEntryDetailView, self).get_context_data(**kwargs)
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        return context

class WeightEntryPostView(FormView):
    """weight entry post view"""
    model = WeightEntry
    form_class = WeightEntryForm
    template_name = "home.html"
    
    
    def form_valid(self, form):
        """create new entry when form is valid"""
        weightentry = form.save(commit=False)
        weightentry.user = self.request.user
        weightentry.save()
        
        return super().form_valid(form)
    
    # def get_context_data(self, **kwargs):
    #     context = super(WeightEntryPostView, self).get_context_data(**kwargs)
    #     weight_entry_list = WeightEntry.objects.all()
    #     context["weight_entry_list"] = weight_entry_list
    #     return context

    def get_success_url(self):
        """get the success url"""
        messages.success(self.request, 'Weight entry added to log.')
        return reverse("home")
    
class WeightEntryUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    """weight entry update view"""
    model = WeightEntry
    template_name = "weight_entry_update.html"
    form_class = WeightEntryEditForm

    def get_success_url(self):
        """get the success url"""
        obj = self.get_object()
        

        n = '<a href='
        n1 = "/{}".format(obj.pk)
        n2 = '>Weight entry</a> updated'
        n_full = n + n1 + n2
        
        print("ALERT ALERT:", n_full)
        messages.info(self.request, mark_safe(n_full))
        return reverse("home")
    
    def test_func(self):
        obj = self.get_object()
        return obj.user == self.request.user
        
class WeightEntryDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    """weight entry update view"""
    model = WeightEntry
    template_name = "weight_entry_delete.html"
    

    def get_success_url(self):
        """get the success url"""
        messages.error(self.request, 'Weight entry deleted')
        return reverse_lazy("home")
    
    def test_func(self):
        obj = self.get_object()
        return obj.user == self.request.user
    
    def get_context_data(self, **kwargs):
        context = super(WeightEntryDeleteView, self).get_context_data(**kwargs)
        context["form2"] = WeightEntryForm(initial={'recorded': datetime.now()})
        return context
        




class AllWeightEntryListView(ListView):
    model = WeightEntry
    template_name = "weight_entry_list.html"
    paginate_by = 10
    queryset = WeightEntry.objects.all().order_by("-recorded", "-updated","-created")
    
    

    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)
    
   
    
    def get_context_data(self, **kwargs):
        context = super(AllWeightEntryListView, self).get_context_data(**kwargs)
        weight_entry_list = WeightEntry.objects.all()
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        context["weight_entry_list"] = weight_entry_list
        return context









class UnusedView(TemplateView):
    """old code from old weight entry list view"""

    # form_class = WeightEntryForm , FormMixin
    # def post(self, request, *args, **kwargs):
    #     """doing POST request"""
    #     view = CommentPostView.as_view()
    #     return view(request, *args, **kwargs)

     # def form_valid(self, form):
    #     """create new comment when form is valid"""
    #     # Get the comment instance by saving the form, but set commit to False,
    #     # because we don't want the form to actually fully save the model to the db yet.
    #     weightentry = form.save(commit=False)
    #     # Attach the logged in user to the new comment.
    #     weightentry.user = self.request.user
    #     # now we call save() to commit the comment to the DB
    #     weightentry.save()
    #     return super().form_valid(form)
    
    # def post(self, request, form, *args, **kwargs):
    #     context = self.get_context_data(**kwargs)
    #     if request.method == 'POST':
    #         form_weight = self.request.POST.get("weight")
    #         form_recorded = self.request.POST.get("recorded")
    #         super().form_valid(form)
    #         # entry = WeightEntry(user=self.request.user, weight = form_weight, recorded = form_recorded)
    #         # entry.save()
    #     context["weight"] = form_weight
    #     context["recorded"] = form_recorded
        
    #     return self.render_to_response(context)
