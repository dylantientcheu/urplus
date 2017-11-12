import requests
from django.http import JsonResponse
from django.views import View
from remarks.models import Comment, Critique, GeneralComment
from remarks.serializers import CommentSerializer, CritiqueSerializer, GeneralCommentSerializer
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from urplus.udacity import CRITIQUES_URL, SUBMISSIONS_URL


class SubmissionInfoView(View):
    def get(self, request):
        response = requests.get(
            SUBMISSIONS_URL.format(request.GET['submission_id']),
            headers=request.udacity_headers,
        )
        response_json = response.json()
        return JsonResponse({
            'generalComment': response_json['general_comment'],
            'price': response_json['price'],
            'projectName': response_json['project']['name'],
        })


class SubmissionCritiquesView(View):
    def get(self, request):
        response = requests.get(
            CRITIQUES_URL.format(request.GET['submission_id']),
            headers=request.udacity_headers,
        )
        return JsonResponse({
            'submissionCritiques': response.json(),
        })


class AllRemarksView(View):
    def get(self, request):
        comment_queryset = Comment.objects.filter(
            reviewer_id=request.reviewer_id,
            project_name=request.GET['project_name'],
        )
        critique_queryset = Critique.objects.filter(
            reviewer_id=request.reviewer_id,
            project_name=request.GET['project_name'],
        )
        general_comment_queryset = GeneralComment.objects.filter(
            reviewer_id=request.reviewer_id,
            project_name=request.GET['project_name'],
        )
        comments_json = CommentSerializer(comment_queryset, many=True).data
        critiques_json = CritiqueSerializer(critique_queryset, many=True).data
        general_comments_json = GeneralCommentSerializer(general_comment_queryset, many=True).data
        return JsonResponse({
            'comments': comments_json,
            'critiques': critiques_json,
            'generalComments': general_comments_json,
        })


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        comment_data = self.request.data
        comment_fields = [
            'project_name',
            'title',
            'topic',
            'body',
            'category',
        ]
        comment_dict = {k: v for k, v in comment_data.items() if k in comment_fields}
        comment_dict['reviewer_id'] = self.request.reviewer_id
        serializer.save(**comment_dict)
    
    @detail_route(methods=['post'])
    def increment(self, request, pk=None):
        comment = self.get_object()
        comment.retrievals += 1
        comment.save()
        return JsonResponse({})


class CritiqueViewSet(viewsets.ModelViewSet):
    queryset = Critique.objects.all()
    serializer_class = CritiqueSerializer

    def perform_create(self, serializer):
        critique_data = self.request.data
        critique_fields = [
            'project_name',
            'title',
            'topic',
            'body',
            'category',
        ]
        critique_dict = {k: v for k, v in critique_data.items() if k in critique_fields}
        critique_dict['reviewer_id'] = self.request.reviewer_id
        serializer.save(**critique_dict)
    
    @detail_route(methods=['post'])
    def increment(self, request, pk=None):
        critique = self.get_object()
        critique.retrievals += 1
        critique.save()
        return JsonResponse({})


class GeneralCommentViewSet(viewsets.ModelViewSet):
    queryset = GeneralComment.objects.all()
    serializer_class = GeneralCommentSerializer

    def perform_create(self, serializer):
        general_comment_data = self.request.data
        general_comment_fields = [
            'project_name',
            'title',
            'body',
            'category',
        ]
        general_comment_dict = {k: v for k, v in general_comment_data.items() if k in general_comment_fields}
        general_comment_dict['reviewer_id'] = self.request.reviewer_id
        serializer.save(**general_comment_dict)
    
    @detail_route(methods=['post'])
    def increment(self, request, pk=None):
        general_comment = self.get_object()
        general_comment.retrievals += 1
        general_comment.save()
        return JsonResponse({})
