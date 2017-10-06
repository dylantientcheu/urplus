from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import SubmissionInfoView, SubmissionCritiquesView, AllRemarksView, \
    CommentViewSet, CritiqueViewSet, GeneralCommentViewSet

router = DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'critiques', CritiqueViewSet)
router.register(r'generalComments', GeneralCommentViewSet)

urlpatterns = [
    url(r'^submission-info/$', SubmissionInfoView.as_view()),
    url(r'^submission-critiques/$', SubmissionCritiquesView.as_view()),
    url(r'^all/$', AllRemarksView.as_view()),
    url(r'', include(router.urls)),

    # old api
    url(r'^get-submission-info/$', SubmissionInfoView.as_view()),
    url(r'^get-submission-critiques/$', SubmissionCritiquesView.as_view()),
    url(r'^get-remarks/$', AllRemarksView.as_view()),
    url(r'^api/v1/', include(router.urls)),
]
