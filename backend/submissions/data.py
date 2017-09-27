import os
import requests
import time
from django.utils.dateparse import parse_datetime
from random import randint
from requests.exceptions import ConnectionError
from .models import Submission

SUBMISSIONS_URL = 'https://review-api.udacity.com/api/v1/submissions/{}.json'
UDACITY_HEADERS = {
    'authorization': os.getenv('MY_UDACITY_AUTH'),
    'content-type': 'application/json;charset=UTF-8'
}


def get_latest_submission():
    def is_latest(sub):
        for i in range(1, 5):
            response = requests.get(SUBMISSIONS_URL.format(
                sub + i), headers=UDACITY_HEADERS)
            time.sleep(1.5)
            if response.status_code == 200:
                return 'lo'

        response = requests.get(
            SUBMISSIONS_URL.format(sub), headers=UDACITY_HEADERS)
        if response.status_code == 200:
            return 'latest'
        
        return 'hi'

    lo = 1
    hi = 10000000 + randint(1, 1000)
    mid = int((lo + hi) / 2)

    while True:
        current = is_latest(mid)
        if current == 'lo':
            lo = mid
        elif current == 'hi':
            hi = mid
        else:
            return mid
        mid = int((lo + hi) / 2)
        time.sleep(1.5)


def get_submission_data(sub_id):
    time.sleep(1.5)
    while True:
        try:
            response = requests.get(SUBMISSIONS_URL.format(
                sub_id), headers=UDACITY_HEADERS)
        except ConnectionError:
            time.sleep(60)
            continue
        if response.status_code == 200 and hasattr(response, 'json'):
            submission = response.json()
            if 'review' in submission['status'] or submission['assigned_at'] is None or submission['completed_at'] is None:
                return {'submission_id': sub_id, 'status': submission['status']}
            try:
                if len(submission['project']['name']) >= 100:
                    return {'submission_id': sub_id}
                submission_data = {
                    'submission_id': submission['id'],
                    'project_id': submission['project']['id'],
                    'project_name': submission['project']['name'],
                    'price': float(submission['price']),
                    'status': submission['status'],
                    'result': submission['result'],
                    'grader_id': submission['grader_id'],
                    'grader_name': submission['grader']['name'],
                    'created_at': parse_datetime(submission['created_at']),
                    'updated_at': parse_datetime(submission['updated_at']),
                    'assigned_at': parse_datetime(submission['assigned_at']),
                    'completed_at': parse_datetime(submission['completed_at']),
                }
            except (KeyError, TypeError):
                return {'submission_id': sub_id}
            return submission_data
        elif response.status_code == 404:
            return {'submission_id': sub_id}
        elif response.status_code == 429:
            time.sleep(10)


def update_submissions():
    if len(Submission.objects.filter(id=1)) == 0:
        start_sub_id = 1
    else:
        start_sub_id = Submission.objects.latest('id').id + 1
    print('Finding latest submission')
    end_sub_id = get_latest_submission()

    print('Updating recent "review" submissions')
    review_submissions = (
        Submission.objects
        .filter(status__contains='review')
        .filter(submission_id__gt=start_sub_id - 60000)
        .order_by('submission_id')
    )
    for rs in review_submissions:
        print('Updating submission {}'.format(rs.submission_id))
        submission_data = get_submission_data(rs.submission_id)
        Submission.objects.filter(
            submission_id=rs.submission_id).update(**submission_data)

    print('Adding submissions {} through {} to database'.format(
        start_sub_id, end_sub_id))

    for sub_id in range(start_sub_id, end_sub_id):
        print('Adding submission {}'.format(sub_id))
        submission_data = get_submission_data(sub_id)
        Submission.objects.create(**submission_data)
