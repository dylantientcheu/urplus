import datetime
import json
import requests
from assign.models import AssignRunner
from django.http import HttpResponse, JsonResponse
from django.views import View
from urplus.udacity import SUB_REQ_ME_URL, SUB_REQ_INSTANCE_URL, \
    SUB_REQ_REFRESH_URL, SUB_REQ_CREATE_URL


def update_submission_request(runner):
    if not runner.active or not runner.projects:
        return
    udacity_headers = {
        'authorization': runner.udacity_jwt,
        'content-type': 'application/json;charset=UTF-8',
    }
    me_sub_json = requests.get(
        SUB_REQ_ME_URL,
        headers=udacity_headers,
    ).json()
    if me_sub_json:
        requests.put(
            SUB_REQ_INSTANCE_URL.format(me_sub_json[0]['id']),
            headers=udacity_headers,
            data=json.dumps({'projects': runner.projects}),
        )
        now = datetime.datetime.now()
        closed_at = datetime.datetime.strptime(
            me_sub_json[0]['closed_at'],
            '%Y-%m-%dT%H:%M:%S.%fZ',
        )
        if closed_at - now < datetime.timedelta(minutes=10):
            requests.put(
                SUB_REQ_REFRESH_URL.format(me_sub_json[0]['id']),
                headers=udacity_headers,
            )
    else:
        requests.post(
            SUB_REQ_CREATE_URL,
            headers=udacity_headers,
            data=json.dumps({'projects': runner.projects}),
        )


class StatusView(View):
    def get(self, request):
        if not request.reviewer_id:
            return HttpResponse(status=400)
        runner = AssignRunner.objects.filter(reviewer_id=request.reviewer_id).first()
        if runner:
            return JsonResponse({
                'assignRunnerActive': runner.active,
                'assigningProjects': runner.projects,
            })


class StartAssignRunnerView(View):
    def post(self, request):
        runner = AssignRunner.objects.filter(reviewer_id=request.reviewer_id).first()
        if runner:
            runner.active = True
            runner.save()
        else:
            data = json.loads(request.body.decode('utf-8'))
            runner = AssignRunner.objects.create(
                reviewer_id=request.reviewer_id,
                active=True,
                projects=data['projects'],
                udacity_jwt=request.udacity_jwt,
            )
        update_submission_request(runner)
        return HttpResponse(status=200)


class StopAssignRunnerView(View):
    def post(self, request):
        runner = AssignRunner.objects.filter(reviewer_id=request.reviewer_id).first()
        if runner:
            runner.active = False
            runner.save()
        me_sub_json = requests.get(
            SUB_REQ_ME_URL,
            headers=request.udacity_headers,
        ).json()
        if me_sub_json:
            requests.delete(
                SUB_REQ_INSTANCE_URL.format(me_sub_json[0]['id']),
                headers=request.udacity_headers,
            )
        return HttpResponse(status=204)


class UpdateProjectsView(View):
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        runner = AssignRunner.objects.filter(reviewer_id=request.reviewer_id).first()
        if runner:
            runner.projects = data['projects']
            runner.save()
            update_submission_request(runner)
        return HttpResponse(status=200)
