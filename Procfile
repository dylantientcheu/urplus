web: cd backend && gunicorn urplus.wsgi
worker: cd backend && python manage.py rqworker default
clock: cd backend && python manage.py updaterunners
