from django.db import models


class Patient(models.Model):
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    dni = models.CharField(max_length=10, unique=True, null=False)
    birthday = models.DateField(null=True)
    genre = models.CharField(
        max_length=1,
        null=True,
        choices=[
            ("M", "Masculino"),
            ("F", "Femenino"),
        ],
    )
    email = models.EmailField(unique=True, null=True)
    phone_number_work = models.CharField(max_length=12, null=True)
    phone_number_mobile = models.CharField(max_length=12, null=True)

    def __str__(self):
        return f"{self.dni} - {self.last_name}, {self.first_name} - {self.email}"
