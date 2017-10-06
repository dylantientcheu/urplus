import requests
from .udacity import ME_URL


class UdacityTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'HTTP_AUTHORIZATION' in request.META:
            request.udacity_headers = {
                'authorization': request.META['HTTP_AUTHORIZATION'],
                'content-type': 'application/json;charset=UTF-8',
            }
            response = requests.get(
                ME_URL,
                headers=request.udacity_headers,
            )
            response_json = response.json()
            request.reviewer_id = response_json['id']
            request.reviewer_languages = response_json['mentor_languages']
        response = self.get_response(request)
        return response
