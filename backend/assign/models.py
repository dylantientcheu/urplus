from django.db import models
from django.contrib.postgres.fields import JSONField, ArrayField


class AssignRunner(models.Model):
    reviewer_id = models.IntegerField()
    active = models.BooleanField()
    projects = JSONField()
    udacity_jwt = models.TextField()
