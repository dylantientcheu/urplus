from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from submissions import views

router = DefaultRouter()
router.register(r'submissions', views.SubmissionViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]
