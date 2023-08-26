from django.urls import path

from.views import TemplateView, WeightEntryListView, WeightEntryUpdateView, WeightEntryDetailView, WeightEntryDeleteView


urlpatterns = [
    path("<int:pk>/delete", WeightEntryDeleteView.as_view(), name="weight_entry_delete"),
    path("<int:pk>/edit", WeightEntryUpdateView.as_view(), name="weight_entry_update"),
    path("<int:pk>", WeightEntryDetailView.as_view(), name="weight_entry_detail"),
    path("", WeightEntryListView.as_view(), name="home"),
]