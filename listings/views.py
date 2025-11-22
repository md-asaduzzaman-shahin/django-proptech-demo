from rest_framework import viewsets
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    # Order properties by newest first
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer