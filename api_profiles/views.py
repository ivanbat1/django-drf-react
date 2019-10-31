from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserProfileSerializers
from .models import Profile


# Create your views here.

class Test(APIView):
    serializer_class = UserProfileSerializers

    def get(self, request):
        """ get all user """
        users = [i.as_json() for i in Profile.objects.all()]
        return Response({'message': users})

    def post(self, request):
        """ add user in db"""
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data})
        return Response({'message': 'bad'})

    def put(self, request, pk=None):
        return Response({'message': 'call put method'})


class TestApiDetail(APIView):
    """
    Retrieve, update or delete a user instance.
    """
    serializer_class = UserProfileSerializers

    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return ('bad')

    def get(self, request, pk, format='json'):
        """ method get user on id """

        snippet = self.get_object(pk)
        if snippet == 'abd':
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = UserProfileSerializers(snippet)
        return Response({'serializer': serializer.data})

    def post(self, request, pk):
        """ call update method """
        serializer = self.serializer_class(instance=self.get_object(pk), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data})
        return Response({'message': 'bad'})

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        users = [i.as_json() for i in Profile.objects.all()]
        return Response({'message': users})
