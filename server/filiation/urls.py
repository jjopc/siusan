from django.urls import path
from .views import PatientList

urlpatterns = [path("patients/", PatientList.as_view(), name="patients")]
