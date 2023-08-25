from django.urls import path

from.views import TemplateView, WeightEntryListView


urlpatterns = [
    path("", WeightEntryListView.as_view(), name="home"),
]