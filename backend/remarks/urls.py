from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import GetSubmissionInfoView, GetSubmissionCritiquesView, GetRemarksView, \
    CommentViewSet, CritiqueViewSet, GeneralCommentViewSet

router = DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'critiques', CritiqueViewSet)
router.register(r'generalComments', GeneralCommentViewSet)

urlpatterns = [
    url(r'^get-submission-info/$', GetSubmissionInfoView.as_view()),
    url(r'^get-submission-critiques/$', GetSubmissionCritiquesView.as_view()),
    url(r'^get-remarks/$', GetRemarksView.as_view()),
    url(r'^api/v1/', include(router.urls)),
]
