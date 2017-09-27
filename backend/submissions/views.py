from rest_framework import viewsets
from .models import Submission
from .serializers import SubmissionSerializer


class SubmissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
