import json
from django.urls import reverse
from rest_framework.test import APIClient
import pytest
from filiation.models import Patient
from users.models import CustomUser


@pytest.mark.django_db
def test_add_patient(create_authenticated_client, create_simple_user):
    client = create_authenticated_client(create_simple_user())

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
def test_add_patient_invalid_json(create_authenticated_client, create_simple_user):
    client = create_authenticated_client(create_simple_user())
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
def test_add_patient_invalid_json_keys(create_authenticated_client, create_simple_user):
    client = create_authenticated_client(create_simple_user())
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
def test_get_single_patient(
    create_authenticated_client, create_simple_user, add_patient
):
    client = create_authenticated_client(create_simple_user())
    patient = add_patient()
    response = client.get(f"/api/v1/patients/{patient.id}/")

    assert response.status_code == 200
    assert response.data["dni"] == "12345678A"


@pytest.mark.django_db
def test_get_all_patients(create_authenticated_client, create_simple_user, add_patient):
    client = create_authenticated_client(create_simple_user())
    patient_one = add_patient(email="test1@test.com", dni="11111111A")
    patient_two = add_patient(email="test2@test.com", dni="22222222A")
    patient_three = add_patient(email="test3@test.com", dni="33333333A")
    response = client.get("/api/v1/patients/")

    assert response.status_code == 200
    assert response.data[0]["dni"] == "11111111A"
    assert response.data[1]["dni"] == "22222222A"


@pytest.mark.django_db
def test_remove_patient(create_authenticated_client, create_simple_user, add_patient):
    client = create_authenticated_client(create_simple_user())
    patient = add_patient()
    response = client.get(f"/api/v1/patients/{patient.id}/")
    assert response.status_code == 200
    assert response.data["dni"] == "12345678A"

    response = client.delete(f"/api/v1/patients/{patient.id}/")
    assert response.status_code == 204

    response = client.get("/api/v1/patients/")
    assert response.status_code == 200
    assert len(response.data) == 0


@pytest.mark.django_db
def test_remove_patient_incorrect_id(
    create_authenticated_client, create_simple_user, add_patient
):
    client = create_authenticated_client(create_simple_user())
    response = client.get(f"/api/v1/patients/99/")
    assert response.status_code == 404


@pytest.mark.django_db
def test_partial_update_patient(
    create_authenticated_client, create_simple_user, add_patient
):
    client = create_authenticated_client(create_simple_user())
    patient = add_patient()
    data = json.dumps(
        {
            "first_name": "test_user",
        }
    )
    response = client.patch(
        f"/api/v1/patients/{patient.id}/",
        data,
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.data["first_name"] == "test_user"

    response_two = client.get(f"/api/v1/patients/{patient.id}/")
    assert response_two.status_code == 200
    assert response_two.data["first_name"] == "test_user"


@pytest.mark.django_db
def test_update_patient(create_authenticated_client, create_simple_user, add_patient):
    client = create_authenticated_client(create_simple_user())
    patient = add_patient()
    data = json.dumps(
        {
            "first_name": "Johnny",
            "last_name": "Doe",
            "dni": "12345678A",
            "birthday": "1970-01-01",
            "genre": "M",
            "email": "john@doe.com",
            "phone_number_work": "1234567",
            "phone_number_mobile": "123456789",
        }
    )
    response = client.put(
        f"/api/v1/patients/{patient.id}/",
        data,
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.data["first_name"] == "Johnny"

    response_two = client.get(f"/api/v1/patients/{patient.id}/")
    assert response_two.status_code == 200
    assert response_two.data["first_name"] == "Johnny"


@pytest.mark.django_db
def test_update_patient_incorrect_id(
    create_authenticated_client, create_simple_user, add_patient
):
    client = create_authenticated_client(create_simple_user())
    response = client.put(f"/api/v1/patients/99/")
    assert response.status_code == 404


@pytest.mark.django_db
@pytest.mark.parametrize(
    "add_patient, payload, status_code",
    [
        ["add_patient", {}, 400],
        [
            "add_patient",
            {
                "first_name": "Johnny",
                "last_name": "Doe",
                "birthday": "1970-01-01",
                "genre": "M",
                "email": "john@doe.com",
                "phone_number_work": "1234567",
                "phone_number_mobile": "123456789",
            },
            400,
        ],
    ],
    indirect=["add_patient"],
)
def test_update_patient_invalid_json(
    create_authenticated_client, create_simple_user, add_patient, payload, status_code
):
    client = create_authenticated_client(create_simple_user())
    patient = add_patient()
    response = client.put(
        f"/api/v1/patients/{patient.id}/",
        payload,
        content_type="application/json",
    )

    assert response.status_code == status_code
