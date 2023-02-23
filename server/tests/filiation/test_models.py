import pytest

from filiation.models import Patient


@pytest.mark.django_db
def test_patient_model():
    patient = Patient(
        first_name="John",
        last_name="Doe",
        dni="12345678A",
        # birthday="01/01/1970",
        birthday="1970-01-01",
        genre="M",
        email="john@doe.com",
        phone_number_work="1234567",
        phone_number_mobile="123456789",
    )
    patient.save()

    assert patient.first_name == "John"
    assert patient.last_name == "Doe"
    assert patient.dni == "12345678A"
    assert patient.birthday == "1970-01-01"
    assert patient.genre == "M"
    assert patient.email == "john@doe.com"
    assert patient.phone_number_work == "1234567"
    assert patient.phone_number_mobile == "123456789"
    assert str(patient) == "12345678A - Doe, John - john@doe.com"
