from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

# The router automatically creates URLs for /properties/, /properties/1/, etc.
router = DefaultRouter()
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]