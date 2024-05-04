from django.db import models


# Create your models here.


class User(models.Model):
    class Meta:
        db_table = 'users'  # Set the table name to 'user'
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    cash = models.IntegerField(null=True)
    courses = models.ManyToManyField('Course', related_name='users')


class Course(models.Model):
    class Meta:
        db_table = 'courses'  # Set the table name to 'user'
    id = models.AutoField(primary_key=True)
    course_code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    price = models.IntegerField(null=True)

