from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView
from django.views.generic.edit import UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


from datetime import datetime
from fitness.forms import WeightEntryForm
from fitness.views import WeightEntryPostView

class SignUpView(CreateView):
    """signup view"""
    form_class = CustomUserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"

class UserProfileView(LoginRequiredMixin, DetailView):
    """user's profile view"""
    model = CustomUser
    template_name = "registration/user_profile.html"

    def post(self, request, *args, **kwargs):
        """doing POST request"""
        view = WeightEntryPostView.as_view()
        return view(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(UserProfileView, self).get_context_data(**kwargs)
        context["form"] = WeightEntryForm(initial={'recorded': datetime.now()})
        
        return context

class UserProfileChangeView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    """view for changing user profile info"""
    form_class = CustomUserChangeForm
    model = CustomUser
    #success_url = reverse_lazy("user_profile")
    template_name = "registration/user_change_profile.html"
    
    def test_func(self):
        obj = self.get_object()
        return obj.pk == self.request.user.pk