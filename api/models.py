from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey
import json

# Create your models here.

class Task(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title

class WeNeed(models.Model):
  title=models.CharField(max_length=200)
  # dates= models.CharField(max_length=200, default='[]')
  task= models.ForeignKey(
        Task,
        related_name="WeNeed",
        db_column="task",
        null=False,
        default='0',
        on_delete=models.CASCADE,
        max_length=330
    )
  user=models.ForeignKey(
        User,
        related_name="WeNeed",
        db_column="user",
        null=False,
        default='0',
        on_delete=models.CASCADE,
        max_length=330
    )
  def __str__(self):
    return self.title

  def set_dates(self, x):
    self.dates = json.dumps(x)

  def get_foo(self):
    return json.loads(self.dates)

class History(models.Model):
  title=models.CharField(max_length=200)
  dates= models.CharField(max_length=200, default='[]')
  user= models.CharField(max_length=200, default='[]')
  task= models.ForeignKey(
        Task,
        related_name="history",
        db_column="task",
        null=False,
        default='0',
        on_delete=models.CASCADE,
        max_length=330
    )
  def __str__(self):
    return self.title

class IBought(models.Model):
  title=models.CharField(max_length=200)
  dates= models.CharField(max_length=200, default='[]')
  task= models.ForeignKey(
        Task,
        related_name="IBought",
        db_column="task",
        null=False,
        default='0',
        on_delete=models.CASCADE,
        max_length=330
    )
  user=models.ForeignKey(
        User,
        related_name="IBought",
        db_column="user",
        null=False,
        default='0',
        on_delete=models.CASCADE,
        max_length=330
    )
  def __str__(self):
    return self.title

  def set_dates(self, x):
    self.dates = json.dumps(x)

  def get_foo(self):
    return json.loads(self.dates)

