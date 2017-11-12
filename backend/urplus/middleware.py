import requests
from .udacity import ME_URL


class UdacityTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'HTTP_AUTHORIZATION' in request.META:
            request.udacity_jwt = request.META['HTTP_AUTHORIZATION']
            request.udacity_headers = {
                'authorization': request.udacity_jwt,
                'content-type': 'application/json;charset=UTF-8',
            }
            me_response = requests.get(
                ME_URL,
                headers=request.udacity_headers,
            )
            me_response_json = me_response.json()
            request.reviewer_id = me_response_json['id']
        response = self.get_response(request)
        return response
