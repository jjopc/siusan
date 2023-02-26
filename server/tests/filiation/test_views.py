import json
from django.urls import reverse
from rest_framework.test import APIClient
import pytest
from filiation.models import Patient
from users.models import CustomUser


@pytest.mark.django_db
def authenticate(client):
    username = "GirlThatLovesToCode"
    password = "something"
    user = CustomUser.objects.create_user(username=username, password=password)
    client.force_login(user)
    return client


@pytest.mark.django_db
def test_add_patient(client):
    authenticate(client)

    patients = Patient.objects.all()
    assert len(patients) == 0

    data = json.dumps(
        {
            "first_name": "John",
            "last_name": "Doe",
            "dni": "12345678A",
            "birthday": "1970-01-01",
            "genre": "M",
            "email": "john@doe.com",
            "phone_number_work": "1234567",
            "phone_number_mobile": "123456789",
        }
    )

    response = client.post(
        "/api/v1/patients/",
        data,
        content_type="application/json",
    )

    assert response.status_code == 201
    assert response.data["dni"] == "12345678A"

    patients = Patient.objects.all()
    assert len(patients) == 1


@pytest.mark.django_db
def test_add_patient_invalid_json(client):
    authenticate(client)

    patients = Patient.objects.all()
    assert len(patients) == 0

    response = client.post(
        "/api/v1/patients/",
        {},
        content_type="application/json",
    )

    assert response.status_code == 400

    patients = Patient.objects.all()
    assert len(patients) == 0


@pytest.mark.django_db
def test_add_patient_invalid_json_keys(client):
    authenticate(client)

    patients = Patient.objects.all()
    assert len(patients) == 0

    data = json.dumps(
        {
            "first_name": "John",
            "last_name": "Doe",
            "dniiii": "12345678A",
            "birthday": "1970-01-01",
            "genre": "M",
            "email": "john@doe.com",
            "phone_number_work": "1234567",
            "phone_number_mobile": "123456789",
        }
    )
    response = client.post(
        "/api/v1/patients/",
        data,
        content_type="application/json",
    )

    assert response.status_code == 400

    patients = Patient.objects.all()
    assert len(patients) == 0


@pytest.mark.django_db
def test_get_single_patient(client, add_patient):
    authenticate(client)
    patient = add_patient()
    response = client.get(f"/api/v1/patients/{patient.id}")

    assert response.status_code == 200
    assert response.data["dni"] == "12345678A"


@pytest.mark.django_db
def test_get_all_patients(client, add_patient):
    authenticate(client)
    patient_one = add_patient(email="test1@test.com", dni="11111111A")
    patient_two = add_patient(email="test2@test.com", dni="22222222A")
    patient_three = add_patient(email="test3@test.com", dni="33333333A")
    response = client.get("/api/v1/patients/")

    assert response.status_code == 200
    assert response.data[0]["dni"] == "11111111A"
    assert response.data[1]["dni"] == "22222222A"
