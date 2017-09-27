from django.db import models


class Comment(models.Model):
    reviewer_id = models.IntegerField()
    project_name = models.CharField(max_length=512)
    title = models.CharField(max_length=512)
    topic = models.CharField(max_length=512)
    body = models.TextField()
    CATEGORY_CHOICES = (
        ('awesome', 'awesome'),
        ('nitpick', 'nitpick'),
        ('critical', 'critical'),
    )
    category = models.CharField(max_length=8, choices=CATEGORY_CHOICES)
    retrievals = models.IntegerField(default=0)


class Critique(models.Model):
    reviewer_id = models.IntegerField()
    project_name = models.CharField(max_length=512)
    title = models.CharField(max_length=512)
    topic = models.CharField(max_length=512)
    body = models.TextField()
    CATEGORY_CHOICES = (
        ('passed', 'passed'),
        ('failed', 'failed'),
    )
    category = models.CharField(max_length=6, choices=CATEGORY_CHOICES)
    retrievals = models.IntegerField(default=0)


class GeneralComment(models.Model):
    reviewer_id = models.IntegerField()
    project_name = models.CharField(max_length=512)
    title = models.CharField(max_length=512)
    body = models.TextField()
    CATEGORY_CHOICES = (
        ('passed', 'passed'),
        ('failed', 'failed'),
    )
    category = models.CharField(max_length=6, choices=CATEGORY_CHOICES)
    retrievals = models.IntegerField(default=0)
