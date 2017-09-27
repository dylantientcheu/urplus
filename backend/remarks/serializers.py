from rest_framework import serializers
from .models import Comment, Critique, GeneralComment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('reviewer_id', 'retrievals',)


class CritiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Critique
        fields = '__all__'
        read_only_fields = ('reviewer_id', 'retrievals',)


class GeneralCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralComment
        fields = '__all__'
        read_only_fields = ('reviewer_id', 'retrievals',)
