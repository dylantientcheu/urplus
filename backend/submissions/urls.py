from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import SubmissionViewSet

router = DefaultRouter()
router.register(r'submissions', SubmissionViewSet)

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
]
