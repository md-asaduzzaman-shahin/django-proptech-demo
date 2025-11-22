from django.contrib import admin
from .models import Property

# This line makes the Property model visible on the admin site
admin.site.register(Property)