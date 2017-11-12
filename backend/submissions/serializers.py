from rest_framework import serializers
from submissions.models import Submission


class SubmissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'
