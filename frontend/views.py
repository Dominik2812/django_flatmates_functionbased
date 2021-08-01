from django.shortcuts import render, redirect

# Create your views here.

def list(request):
	if request.user.is_authenticated:
        # user = request.user
		context={'user':request.user}
		return render(request, 'frontend/start.html', context)
	else:
		return redirect ('/accounts/login')