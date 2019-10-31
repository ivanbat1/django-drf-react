from rest_framework import serializers
from .models import Profile

class UserProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'name', 'surname', 'date_create', 'date_update', 'img')
