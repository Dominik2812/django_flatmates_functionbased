from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer, IBoughtSerializer, WeNeedSerializer, HistorySerializer

from .models import Task,IBought,User, WeNeed, History
# Create your views here.

from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

def start(request):
    return redirect('/accounts/login')
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

from django.contrib.auth import logout
def logout_view(request):
    logout(request)
    # Redirect to a success page.
    return redirect('/accounts/login')

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def taskList(request):
	tasks = Task.objects.all().order_by('-id')
	serializer = TaskSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def IBoughtList(request):
	iBought = IBought.objects.all().order_by('dates')
	serializer = IBoughtSerializer(iBought, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def HistoryList(request):
	print('___________________haaaaaaaaloo')
	history = History.objects.all().order_by('dates')
	serializer = HistorySerializer(history, many=True)
	print('HistorySerializer', serializer.data)
	return Response(serializer.data)

@api_view(['GET'])
def weNeedList(request):
	weNeed = WeNeed.objects.all().order_by('id')
	serializer = WeNeedSerializer(weNeed, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
	user=request.user
	task = Task.objects.get(id=pk)
	history=History.objects.filter(task=task)
	print(history)
	[print(hist.dates) for hist in history]

	serializer = HistorySerializer(history, many=True)
	print(type(serializer.data))
	return Response(serializer.data)
	

@api_view(['POST'])
def createIBought(request):
	print('im in----------------------------')
	related_user = User.objects.get(id=request.data['user'])
	related_task = Task.objects.get(id=request.data['task'])
	print('related_user', related_user)
	print('related_task', related_task)
	IBought(
		title=request.data['title'],
		dates=request.data['dates'],
		task=related_task,
		user=related_user,
	)
	newHistory=History(
		title=request.data['title'],
		dates=request.data['dates'],
		user=related_user,
		task=related_task,
	)
	newHistory.save()
	print(request.data)
	[print(request.data[el]) for el in request.data]
	serializer = IBoughtSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def createWeNeed(request):
	print('im in----------------------------')
	related_user = User.objects.get(id=request.data['user'])
	related_task = Task.objects.get(id=request.data['task'])
	print('related_user', related_user)
	print('related_task', related_task)
	WeNeed(
		title=request.data['title'],
		task=related_task,
		user=related_user,
	)
	print(request.data)
	[print(request.data[el]) for el in request.data]
	serializer = WeNeedSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
	serializer = TaskSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	
	task = Task.objects.get(id=pk)
	iboughts_attached=IBought.objects.filter(task=task)
	print(iboughts_attached)
	# ibought.delete()

	task.delete()

	return Response('Item succsesfully delete!')

@api_view(['DELETE'])
def deleteNeed(request, pk):
	print('+++++ We Need')
	weNeed = WeNeed.objects.get(id=pk)
	# iboughts_attached=IBought.objects.filter(task=task)
	print('+++++ We Need', weNeed)
	# ibought.delete()

	weNeed.delete()

	return Response('Item succsesfully delete!')



