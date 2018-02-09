from django.contrib import admin

from remarks.models import Comment, Critique, GeneralComment

admin.site.register(Comment)
admin.site.register(Critique)
admin.site.register(GeneralComment)
