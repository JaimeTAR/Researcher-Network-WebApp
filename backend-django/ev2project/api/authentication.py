from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import AuthenticationFailed

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        if not token:
            return None

        try:
            access_token = AccessToken(token)
            user = User.objects.get(id=access_token["user_id"])
            return (user, None)
        except (ObjectDoesNotExist, AuthenticationFailed):
            return None
