from remarks.models import Comment, Critique, GeneralComment


def load_remarks(remarks):
    for comment in remarks['comments']:
        comment_fields = [
            'reviewer_id',
            'project_name',
            'title',
            'topic',
            'body',
            'category',
            'retrievals',
        ]
        comment_dict = {k: v for k, v in comment.items() if k in comment_fields}
        existing_comment = Comment.objects.filter(
            title=comment_dict['title'],
            topic=comment_dict['topic'],
        )
        if not existing_comment:
            Comment(**comment_dict).save()

    for critique in remarks['critiques']:
        critique_fields = [
            'reviewer_id',
            'project_name',
            'title',
            'topic',
            'body',
            'category',
            'retrievals',
        ]
        critique_dict = {k: v for k, v in critique.items() if k in critique_fields}
        existing_critique = Critique.objects.filter(
            title=critique_dict['title'],
            topic=critique_dict['topic'],
        )
        if not existing_critique:
            Critique(**critique_dict).save()

    for gen_comment in remarks['generalComments']:
        gen_comment_fields = [
            'reviewer_id',
            'project_name',
            'title',
            'body',
            'category',
            'retrievals',
        ]
        gen_comment_dict = {k: v for k, v in gen_comment.items() if k in gen_comment_fields}
        existing_gen_comment = GeneralComment.objects.filter(
            title=critique_dict['title'],
        )
        if not existing_gen_comment:
            GeneralComment(**gen_comment_dict).save()
