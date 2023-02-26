from django.urls import path
from .views import PatientList, PatientDetail

urlpatterns = [
    path("patients/", PatientList.as_view(), name="patients"),
    path("patients/<int:pk>", PatientDetail.as_view(), name="patient_detail"),
]
