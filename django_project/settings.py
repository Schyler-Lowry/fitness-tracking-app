"""
Django settings for django_project project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from django.contrib.messages import constants as messages
import os
from environs import Env
from pathlib import Path

# Setup environs
env = Env()
env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=False)

ALLOWED_HOSTS = [".herokuapp.com", "localhost", "127.0.0.1", "10.0.0.155"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third Party
    'whitenoise.runserver_nostatic',
    'crispy_forms',
    'crispy_bootstrap5',
    'bootstrap_datepicker_plus',
    'corsheaders',
    # Local First Party
    'accounts.apps.AccountsConfig',
    'fitness.apps.FitnessConfig',
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# CSRF_COOKIE_SAMESITE = 'Strict'
# SESSION_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_HTTPONLY = False
SESSION_COOKIE_HTTPONLY = False
# CSRF_COOKIE_SECURE = False
# SESSION_COOKIE_SECURE = True

# Set both to True for production.
# CSRF_COOKIE_HTTPONLY = False
# SESSION_COOKIE_HTTPONLY = True


# CSRF_COOKIE_SECURE = False
# SESSION_COOKIE_SECURE = False
# CORS_ALLOWED_ORIGINS = [
#     "http://10.0.0.155:5173",
#     "http://10.0.0.155:8000",
#     "http://localhost:8000",
# ]

CORS_ALLOW_ALL_ORIGINS = True


CORS_ALLOW_CREDENTIALS = True

# SESSION_COOKIE_SAMESITE = None
# CSRF_COOKIE_SAMESITE = None

# CSRF_COOKIE_HTTPONLY = True
# SESSION_COOKIE_HTTPONLY = True

# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = False
# SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SAMESITE = 'Lax'

# SESSION_COOKIE_DOMAIN = 'weight-tracking-app-a9db95db2d03.herokuapp.com'
# CSRF_COOKIE_DOMAIN = 'weight-tracking-app-a9db95db2d03.herokuapp.com'

# SESSION_ENGINE = 'django.contrib.sessions.backends.file'
# SESSION_FILE_PATH = 'C:\\Users\\schyl\\schyler_coding_projects\\Python_Stuff\\fitness-tracking-app\\sessions'
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

ROOT_URLCONF = 'django_project.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [BASE_DIR / "templates"],
        'DIRS': [BASE_DIR.joinpath("fitness-tracker_react")],

        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': env.dj_db_url("DATABASE_URL")
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
# Set the Auth User
AUTH_USER_MODEL = "accounts.CustomUser"

# Login and Logout redirect urls
LOGIN_REDIRECT_URL = "home"
LOGOUT_REDIRECT_URL = "home"

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

# technically, you should leave this as UTC, and use some method to render time to the user based on their time zone

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_TZ = True

# Email settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
DEFAULT_FROM_EMAIL = "noreply@assignment4.com"
EMAIL_HOST = "barnesbrothers.net"
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
EMAIL_PORT = 2500
EMAIL_USE_TLS = False
EMAIL_USE_SSL = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
# STATICFILES_DIRS = [BASE_DIR / "static"]
STATICFILES_DIRS = [BASE_DIR / "fitness-tracker_react" / "dist"]


STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Crispy Forms Settings
CRISPY_ALLOWED_TEMPLATES_PACKS = 'bootstrap5'
CRISPY_TEMPLATE_PACK = "bootstrap5"


MESSAGE_TAGS = {
    messages.DEBUG: 'alert-secondary',
    messages.INFO: 'alert-info',
    messages.SUCCESS: 'alert-success',
    messages.WARNING: 'alert-warning',
    messages.ERROR: 'alert-danger',
}

BOOTSTRAP_DATEPICKER_PLUS = {
    "options": {
        "locale": "us",
    },
    "variant_options": {
        "datetime": {
            "format": "MM/DD/YY h:mm A",
            "showTodayButton": True,
        },
    }
}
