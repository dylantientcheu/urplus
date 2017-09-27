import requests


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
                'https://review-api.udacity.com/api/v1/me.json',
                headers=request.udacity_headers
            )
            request.reviewer_id = response.json()['id']
        response = self.get_response(request)
        return response
