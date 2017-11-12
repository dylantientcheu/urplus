from assign import views
from django.conf.urls import url

urlpatterns = [
    url(r'^status/$', views.StatusView.as_view()),
    url(r'^start/$', views.StartAssignRunnerView.as_view()),
    url(r'^stop/$', views.StopAssignRunnerView.as_view()),
    url(r'^update-projects/$', views.UpdateProjectsView.as_view()),
]
