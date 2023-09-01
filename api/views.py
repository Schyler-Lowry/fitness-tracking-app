
from django.http import JsonResponse
from django.views import View

from fitness.models import WeightEntry
from accounts.models import CustomUser


class ApiWeightEntryListView(View):
    """List of weight entries"""

    def get(self, request, *args, **kwargs):
        """GET request"""
        weightentries = list(
            WeightEntry.objects.all().select_related().values()
        )

        return JsonResponse(weightentries, safe=False)


class ApiWeightEntryDetailView(View):
    """Detail of Weight Entry returned as JSON"""

    def get(self, request, weightentry_pk, *args, **kwargs):
        """GET Request"""
        weightentry = WeightEntry.objects.values().get(
            pk=weightentry_pk,
        )

        entryuser = WeightEntry.objects.select_related().get(pk=weightentry_pk)
        username = entryuser.user.username
        weightentry["user"] = username
        # print("username; ", username)
        # print("MY TEST QUERY:", entryuser)
        # print("THE API JSON:", weightentry)
        return JsonResponse(weightentry, safe=False)


class ApiUserWeightEntryListView(View):
    """List of weight entries from a single user"""

    def get(self, request, user_pk, *args, **kwargs):
        """GET Request"""
        userweightentries = list(
            WeightEntry.objects.filter(user__pk=user_pk).values())

        user = CustomUser.objects.get(pk=user_pk)
        i = 0
        for entries in userweightentries:
            userweightentries[i]["user"] = user.username
            i += 1

        return JsonResponse(userweightentries, safe=False)
