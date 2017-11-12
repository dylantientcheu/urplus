import django_rq
from apscheduler.schedulers.blocking import BlockingScheduler
from assign.models import AssignRunner
from assign.views import update_submission_request
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Updates the submission requests for all active AssignRunners'

    def handle(self, *args, **options):
        sched = BlockingScheduler()

        @sched.scheduled_job('interval', minutes=1)
        def update_runners():
            runners = AssignRunner.objects.filter(active=True)
            for runner in runners:
                django_rq.enqueue(update_submission_request, args=[runner])

        sched.start()
