from rest_framework import viewsets
from submissions.models import Submission
from submissions.serializers import SubmissionSerializer


class SubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
