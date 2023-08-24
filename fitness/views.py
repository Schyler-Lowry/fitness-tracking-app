from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

from django.http import Http404, JsonResponse
from django.views import View
from django.views.generic import ListView, DetailView, FormView
from django.views.generic.detail import SingleObjectMixin

from django.views.generic.edit import UpdateView, DeleteView, CreateView, FormMixin

from django.urls import reverse_lazy, reverse


class WeightEntryListView(ListView):
    pass