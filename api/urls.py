from django.urls import path

from .views import (
    ApiUserWeightEntryListView,
    ApiWeightEntryDetailView,
    ApiWeightEntryListView
)

urlpatterns = [
    path(
        "entries/list/<int:user_pk>/",
        ApiUserWeightEntryListView.as_view(),
        name="api_user_weight_entries",
    ),
    path(
        "entries/detail/<int:weightentry_pk>/",
        ApiWeightEntryDetailView.as_view(),
        name="api_weight_entry_detail",
    ),
    path(
        "entries/list/",
        ApiWeightEntryListView.as_view(),
        name="api_weight_entry_list",
    )
]
