from django.urls import path
from .views import SignUpView, UserProfileView, UserProfileChangeView, UserWeightEntryListView
from django.views.generic import RedirectView

urlpatterns = [
        path("signup/", SignUpView.as_view(), name="signup"),
        path('profile/<int:pk>/edit', UserProfileChangeView.as_view(), name='user_change_profile'),
        path('profile/<int:pk>/entries', UserWeightEntryListView.as_view(), name='user_entry_list'),
        path("profile/<int:pk>/", UserProfileView.as_view(), name="user_profile"),
]