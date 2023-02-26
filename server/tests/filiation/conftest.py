import pytest
from django.urls import reverse
from users.models import CustomUser
from rest_framework.test import APIClient
from filiation.models import Patient
from users.models import CustomUser


# @pytest.fixture(scope="function")
# def authenticate():
#     def _authenticate(client, username, password):
#         user = CustomUser.objects.create_user(username=username, password=password)
#         client.force_login(user)
#         return client

#     return _authenticate


@pytest.fixture(scope="function")
def add_patient():
    def _add_patient(
        first_name="John",
        last_name="Doe",
        dni="12345678A",
        birthday="1970-01-01",
        genre="M",
        email="john@doe.com",
        phone_number_work="1234567",
        phone_number_mobile="123456789",
    ):
        patient = Patient.objects.create(
            first_name=first_name,
            last_name=last_name,
            dni=dni,
            birthday=birthday,
            genre=genre,
            email=email,
            phone_number_work=phone_number_work,
            phone_number_mobile=phone_number_mobile,
        )
        return patient

    return _add_patient
