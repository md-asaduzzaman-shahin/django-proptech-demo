from django.db import models
from .services import generate_property_description

class Property(models.Model):
    PROPERTY_TYPES = [('office', 'Office'), ('retail', 'Retail'), ('industrial', 'Industrial')]
    
    title = models.CharField(max_length=200)
    address = models.CharField(max_length=300)
    suburb = models.CharField(max_length=100)
    state = models.CharField(max_length=10, default='NSW')
    postcode = models.CharField(max_length=10)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    size_sqm = models.IntegerField()
    annual_rent = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # fix the plural nameing
    class Meta:
        verbose_name_plural = "Properties"

    def save(self, *args, **kwargs):
        # ... (keep your existing AI save logic here) ...
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.suburb}"