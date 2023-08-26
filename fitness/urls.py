from django.urls import path

from.views import TemplateView, WeightEntryListView, WeightEntryUpdateView


urlpatterns = [
    path("<int:pk>/edit", WeightEntryUpdateView.as_view(), name="weight_entry_update"),
    path("", WeightEntryListView.as_view(), name="home"),
]