from django.conf.urls import url, include
from remarks import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'comments', views.CommentViewSet)
router.register(r'critiques', views.CritiqueViewSet)
router.register(r'generalComments', views.GeneralCommentViewSet)

urlpatterns = [
    url(r'^submission-info/$', views.SubmissionInfoView.as_view()),
    url(r'^submission-critiques/$', views.SubmissionCritiquesView.as_view()),
    url(r'^all/$', views.AllRemarksView.as_view()),
    url(r'', include(router.urls)),
]
