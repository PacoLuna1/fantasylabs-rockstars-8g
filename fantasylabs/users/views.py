from django.contrib.auth.models import Group
from fantasylabs.users.models import User

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView 
from rest_framework.generics import GenericAPIView
from fantasylabs.users.serializers import UserSerializer, RefreshTokenSerializer, GroupSerializer
from rest_framework.response import Response
from rest_framework import status

class LoginView(APIView):
  def post(self, request):
    email = request.data['email']
    username = request.data['username']
    password = request.data['password']

    user = User.objects.filter(email=email).first()

    if user is None:
      raise AuthenticationFailed('Email is not register yer!')

    if not user.check_password(password):
      raise AuthenticationFailed('Incorrect password!')

    response = Response()

    response.data = {
      'id': user.id,
      'email': user.email,
      'type': user.type
    }
    return response

class LogoutView(GenericAPIView):
  serializer_class = RefreshTokenSerializer
  permission_classes = (permissions.IsAuthenticated, )

  def post(self, request, *args):
    sz = self.get_serializer(data=request.data)
    sz.is_valid(raise_exception=True)
    sz.save()
    return Response(status=status.HTTP_204_NO_CONTENT)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]