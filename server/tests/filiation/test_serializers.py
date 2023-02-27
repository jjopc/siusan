import datetime
import pytest

from filiation.serializers import PatientSerializer


# TODO: Ver cómo puedo hacer el testing de las fechas
@pytest.mark.django_db
def test_valid_patient_serializer():
    valid_serializer_data = {
        "first_name": "John",
        "last_name": "Doe",
        "dni": "12345678A",
        # "birthday": datetime.date(1970, 1, 1),
        "birthday": "1970-01-01",
        "genre": "M",
        "email": "john@doe.com",
        "phone_number_work": "1234567",
        "phone_number_mobile": "123456789",
    }
    serializer = PatientSerializer(data=valid_serializer_data)

    assert serializer.is_valid()
    assert serializer.validated_data == valid_serializer_data
    assert serializer.data == valid_serializer_data
    assert serializer.errors == {}


# TODO: Ver cómo puedo hacer el testing de las fechas
@pytest.mark.django_db
def test_invalid_patient_serializer():
    invalid_serializer_data = {
        "first_name": "John",
        "last_name": "Doe",
        # "dni": "12345678A",
        "birthday": "1970-01-01",
        "genre": "M",
        "email": "john@doe.com",
        "phone_number_work": "1234567",
        "phone_number_mobile": "123456789",
    }
    serializer = PatientSerializer(data=invalid_serializer_data)

    assert not serializer.is_valid()
    assert serializer.validated_data == {}
    assert serializer.data == invalid_serializer_data
    assert serializer.errors == {"dni": ["Este campo es requerido."]}
