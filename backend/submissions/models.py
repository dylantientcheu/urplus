from django.db import models


class Submission(models.Model):
    submission_id = models.IntegerField()
    project_id = models.IntegerField(null=True, blank=True)
    project_name = models.CharField(max_length=100, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True)
    result = models.CharField(max_length=50, null=True, blank=True)
    grader_id = models.IntegerField(null=True, blank=True)
    grader_name = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    assigned_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
