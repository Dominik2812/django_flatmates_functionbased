from django.urls import path, include
from . import views


urlpatterns = [
	path('overview/', views.apiOverview, name="api-overview"),
	path('task-list/', views.taskList, name="task-list"),
	path('I-bought-create/', views.createIBought, name='createIBought'),
	path('I-bought-list/', views.IBoughtList, name='IBoughtList'),
	path('history-list/', views.HistoryList, name='IBoughtList'),
	path('weNeed-list/', views.weNeedList, name='weNeedList'),
	path('We-Need-create/', views.createWeNeed, name='createWeNeed'),
	path('delete-Need/<str:pk>/', views.deleteNeed, name='deleteNeed'),
	path('task-detail/<str:pk>/', views.taskDetail, name="task-detail"),
	path('task-create/', views.taskCreate, name="task-create"),
	path('task-update/<str:pk>/', views.taskUpdate, name="task-update"),
	path('task-delete/<str:pk>/', views.taskDelete, name="task-delete"),


]
