from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from datetime import datetime
from django.shortcuts import redirect
from django.http import Http404, JsonResponse
from django.views import View
from django.views.generic import ListView, DetailView, FormView, TemplateView
from django.views.generic.detail import SingleObjectMixin

from django.views.generic.edit import UpdateView, DeleteView, CreateView, FormMixin
from django.urls import reverse_lazy, reverse

from .models import WeightEntry
from .forms import WeightEntryForm

class TemplateView(LoginRequiredMixin, TemplateView):
    template_name="home.html"

class WeightEntryListView(TemplateView):
    model = WeightEntry
    template_name = "home.html"
    
    # form_class = WeightEntryForm , FormMixin
    # def post(self, request, *args, **kwargs):
    #     """doing POST request"""
    #     view = CommentPostView.as_view()
    #     return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)
    
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

    
    def get_context_data(self, **kwargs):
        context = super(WeightEntryListView, self).get_context_data(**kwargs)
        weight_entry_list = WeightEntry.objects.all()
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        context["weight_entry_list"] = weight_entry_list
        
        return context

class WeightEntryCreateView(FormView):
    model = WeightEntry
    
class WeightEntryPostView(FormView):
    """comment post view"""
    model = WeightEntry
    form_class = WeightEntryForm
    template_name = "home.html"
    
    
    def form_valid(self, form):
        """create new comment when form is valid"""
        # Get the comment instance by saving the form, but set commit to False,
        # because we don't want the form to actually fully save the model to the db yet.
        weightentry = form.save(commit=False)
        # Attach the logged in user to the new comment.
        weightentry.user = self.request.user
        # now we call save() to commit the comment to the DB
        weightentry.save()
        return super().form_valid(form)
    
    def get_success_url(self):
        """get the success url"""
        
        return reverse("home")
    #     #return reverse("home")