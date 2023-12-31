from django.urls import path

from .views import (
    ApiUserWeightEntryListView,
    ApiWeightEntryDetailView,
    ApiWeightEntryListView,
    ApiWeightEntryUpdateView,
    ApiWeightEntryUpdateViewWithObject,
    ApiWeightEntryAddView,
    ApiLoginView,
    ApiCheckLoginView,
    check_auth_status,
    ApiLogoutView,
    ApiWeightEntryDeleteView,
    login_view,
    logout_view,
    session_view,
    whoami_view
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
    ),
    path(
        "entries/detail/<int:weightentry_pk>/edit",
        ApiWeightEntryUpdateView.as_view(),
        name="api_weight_entry_edit",
    ),
    path(
        "entries/edit",
        ApiWeightEntryUpdateViewWithObject.as_view(),
        name="api_weight_entry_edit_object",
    ),
    path(
        "entries/add",
        ApiWeightEntryAddView.as_view(),
        name="api_weight_entry_add",
    ),
    path(
        "login",
        ApiLoginView.as_view(),
        name="api_login",
    ),
    path(
        "checklogin",
        ApiCheckLoginView.as_view(),
        name="api_check_login",
    ),
    path('check-auth/', check_auth_status, name='check-auth'),
    path('logout', ApiLogoutView.as_view(), name='api_logout'),
    path(
        "entries/delete",
        ApiWeightEntryDeleteView.as_view(),
        name="api_weight_entry_delete",
    ),
    # path("login-view/", login_view, name="api_login_view"),
    # path("logout-view/", logout_view, name="api_logout_view"),
    # path("session-view/", session_view, name="api_session_view"),
    # path("whoami-view/", whoami_view, name="api_whoami_view"),
]
