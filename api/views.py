
from django.http import JsonResponse, Http404
from django.views import View
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
import json
from django.contrib.auth import authenticate, login, logout, user_logged_in
from django.contrib.sessions.backends.db import SessionStore
from django.views.decorators.http import require_POST

from fitness.models import WeightEntry
from accounts.models import CustomUser
from django.db.models import F
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import login_required


@method_decorator(csrf_exempt, name='dispatch')
def login_view(request):
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({"detail": "Provide username/password"})
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({"detail": "Invalid credentials"})
    login(request, user)
    request.session.save()

    user_dict = model_to_dict(user)
    return JsonResponse({'message': 'Logged in successfully', "user": user_dict}, status=200)


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "Not logged in"})
    logout(request)
    return JsonResponse({"detail": "Logged out"})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"is_authenticated": False})
    return JsonResponse({"is_authenticated": True})


@ensure_csrf_cookie
def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"username": "Anonymous User"})
    return JsonResponse({"username": request.user.username})


# @login_required
@method_decorator(csrf_exempt, name='dispatch')
def check_auth_status(request):
    """Check if the user is authenticated."""
    # print(request.session)
    if not request.user.is_authenticated:
        return JsonResponse({"is_authenticated": False})
    return JsonResponse({"is_authenticated": True})

    # return JsonResponse({
    #     'is_authenticated': request.user.is_authenticated,
    #     'username': request.user.username if request.user.is_authenticated else ''
    # })


@method_decorator(csrf_exempt, name='dispatch')
class ApiLogoutView(View):
    """Log a user out"""

    def get(self, request, *args, **kwargs):
        """GET request"""
        # Log the user out
        logout(request)

        # Return a JSON response
        return JsonResponse({'message': 'Logged out successfully'}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class ApiCheckLoginView(View):
    """Check if a user is logged in"""

    def get(self, request, *args, **kwargs):
        """GET request"""
        # Check if the user is authenticated

        # session_value = request.session.get("my_session")

        # print(request.user)
        # print("Session Items: ", request.session.items())

        if request.user.is_authenticated:
            # The user is logged in
            user_dict = model_to_dict(request.user)
            return JsonResponse({'message': 'User is logged in', 'user': user_dict}, status=200)
        else:
            # The user is not logged in
            return JsonResponse({'message': 'User is not logged in'}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class ApiLoginView(View):
    """Log a user in"""

    def post(self, request, *args, **kwargs):
        """POST request"""
        # Parse the JSON data from the request body
        data = json.loads(request.body)

        # Extract the username and password from the JSON
        username = data.get('username')
        password = data.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log the user in
            login(request, user)
            user_dict = model_to_dict(user)

            # Save the session data manually
            request.session.save()
            request.session["my_session"] = "schyl"

            session_value = request.session.get("my_session")
            if request.user.is_authenticated:
                print("Authenticated...")
                print(request.user)
                # print("Session Items: ", request.session.items())

            # Return a JSON response
            return JsonResponse({'message': 'Logged in successfully', "user": user_dict, "session_value": session_value}, status=200)
        else:
            # Authentication failed
            return JsonResponse({'message': 'Invalid username or password'}, status=401)

# @method_decorator(csrf_exempt, name='dispatch')
# class ApiLoginView(View):
#     """Log a user in"""

#     def post(self, request, *args, **kwargs):
#         """POST request"""
#         # Parse the JSON data from the request body
#         data = json.loads(request.body)

#         # Extract the username and password from the JSON
#         username = data.get('username')
#         password = data.get('password')

#         # Authenticate the user
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             # Log the user in
#             login(request, user)

#             # Save the session data manually
#             request.session.save()

#             # Return a JSON response
#             return JsonResponse({'message': 'Logged in successfully'}, status=200)
#         else:
#             # Authentication failed
#             return JsonResponse({'message': 'Invalid username or password'}, status=401)


@method_decorator([csrf_exempt, login_required], name='dispatch')
class ApiWeightEntryDeleteView(View):
    """Delete a weight entry"""

    def post(self, request, *args, **kwargs):
        """POST request"""
        # Parse the JSON data from the request body
        data = json.loads(request.body)

        # Extract the weight entry data from the JSON
        id = data.get('id')

        # Get the WeightEntry object
        try:
            weight_entry = WeightEntry.objects.get(id=id)
        except WeightEntry.DoesNotExist:
            raise Http404("WeightEntry does not exist")

        # Update the weight field

        weight_entry.delete()

        # Return a JSON response
        return JsonResponse({'message': 'WeightEntry deleted successfully'}, status=200)


@method_decorator([csrf_exempt, login_required], name='dispatch')
class ApiWeightEntryAddView(View):
    """Add a weight entry"""

    def post(self, request, *args, **kwargs):
        print("Received CSRF token: ", request.META.get('HTTP_X_CSRFTOKEN'))
        """POST request"""
        # Parse the JSON data from the request body
        data = json.loads(request.body)

        # Extract the weight entry data from the JSON
        weight = data.get('weight')
        recorded = data.get("recorded")
        note = data.get("note")
        user_id = data.get("user_id")

        # print(data)

        # Create a new WeightEntry object and save it to the database
        weight_entry = WeightEntry.objects.create(
            weight=weight, recorded=recorded, note=note, user_id=user_id)

        # Return a JSON response
        return JsonResponse({'message': 'WeightEntry added successfully', 'id': weight_entry.id}, status=201)


@method_decorator([csrf_exempt, login_required], name='dispatch')
class ApiWeightEntryUpdateViewWithObject(View):
    """Update a specific weight entry"""

    def post(self, request, *args, **kwargs):
        """POST request"""
        # Parse the JSON data from the request body
        data = json.loads(request.body)

        # Extract the weight entry data from the JSON
        id = data.get('id')
        weight = data.get('weight')
        note = data.get("note")
        recorded = data.get("recorded")

        # Get the WeightEntry object
        try:
            weight_entry = WeightEntry.objects.get(id=id)
        except WeightEntry.DoesNotExist:
            raise Http404("WeightEntry does not exist")

        # Update the weight field
        weight_entry.weight = weight
        weight_entry.note = note
        weight_entry.recorded = recorded
        weight_entry.save()

        # Return a JSON response
        return JsonResponse({'message': 'WeightEntry updated successfully', "updated_entry": model_to_dict(weight_entry)}, status=200)


@method_decorator([csrf_exempt, login_required], name='dispatch')
class ApiWeightEntryUpdateView(View):
    """Update a specific weight entry"""

    def post(self, request, weightentry_pk, *args, **kwargs):
        """POST request"""
        # Parse the JSON data from the request body
        data = json.loads(request.body)

        # Extract the weight entry data from the JSON
        # id = data.get('id')
        weight = data.get('weight')

        # Get the WeightEntry object
        try:
            weight_entry = WeightEntry.objects.get(id=weightentry_pk)
        except WeightEntry.DoesNotExist:
            raise Http404("WeightEntry does not exist")

        # Update the weight field
        weight_entry.weight = weight
        weight_entry.save()

        # Return a JSON response
        return JsonResponse({'message': 'WeightEntry updated successfully'}, status=200)


class ApiWeightEntryListView(View):
    """List of weight entries"""

    def get(self, request, *args, **kwargs):
        """GET request"""
        user = request.user
        print(request.user)
        print(type(request.user.id))
        # print(model_to_dict(request.user))

        weightentries = WeightEntry.objects.all().select_related("user").annotate(
            username=F("user__username")).values().order_by("-recorded", "-updated", "-created")

        # weight entries for the logged in user
        weight_entries_from_user = WeightEntry.objects.filter(
            user_id=user.id).select_related("user").annotate(username=F("user__username")).values().order_by("-recorded", "-updated", "-created")

        # Create a Paginator object
        # Show 10 weight entries per page
        paginator = Paginator(weightentries, 10)
        paginator_user = Paginator(weight_entries_from_user, 10)

        # Get the page number from the query params
        page_number = request.GET.get('page')

        # Get the objects for the requested page
        page_obj = paginator.get_page(page_number)
        page_obj_user = paginator_user.get_page(page_number)

        # Convert the page objects to a list
        weightentries_page = list(page_obj)
        weightentries_user_page = list(page_obj_user)

        # Get the total number of pages
        total_pages = paginator.num_pages
        total_entries = paginator.count

        # return JsonResponse(weightentries_page, safe=False)
        return JsonResponse({'weightentries': weightentries_page, 'total_pages': total_pages, 'total_entries': total_entries, "weight_entries_from_user": weightentries_user_page}, safe=False)


# class ApiWeightEntryListViewNonPaginated(View):
#     """List of weight entries"""

#     def get(self, request, *args, **kwargs):
#         """GET request"""
#         weightentries = list(
#             WeightEntry.objects.all().select_related().values()
#         )

#         return JsonResponse(weightentries, safe=False)


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
