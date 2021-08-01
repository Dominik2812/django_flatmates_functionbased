from rest_framework import serializers
from .models import Task,IBought, WeNeed, History

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task
		fields ='__all__'

class IBoughtSerializer(serializers.ModelSerializer):
	class Meta:
		model = IBought
		fields ='__all__'
class WeNeedSerializer(serializers.ModelSerializer):
	class Meta:
		model = WeNeed
		fields ='__all__'
class HistorySerializer(serializers.ModelSerializer):
	class Meta:
		model = History
		fields ='__all__'
