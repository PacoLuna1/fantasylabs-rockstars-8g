from django.contrib.auth.models import Group
from fantasylabs.users.models import User

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from django.utils.text import gettext_lazy as _

class RefreshTokenSerializer(serializers.Serializer):
  refresh = serializers.CharField()

  default_error_messages = {
    'bad_token': _('Token is invalid or expired')
  }

  def validate(self, attrs):
    self.refresh_token = attrs['refresh']

    return attrs

  def save(self, **kwargs):
    try:
      RefreshToken(self.refresh_token).blacklist()
    except TokenError:
      self.fail('bad_token')
    


class UserSerializer(serializers.ModelSerializer):
    def validate_password(self, value: str) -> str:
      return make_password(value) 

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'type', 'groups']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'write_only': True},
        }


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']