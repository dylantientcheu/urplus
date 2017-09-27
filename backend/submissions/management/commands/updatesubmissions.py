from django.core.management.base import BaseCommand
from submissions.data import update_submissions


class Command(BaseCommand):
    help = 'Updates submission database'

    def handle(self, *args, **options):
        update_submissions()
