from django.contrib import admin

# Register your models here.

from .models import Task,  IBought, WeNeed, History

admin.site.register(Task)
admin.site.register(IBought)
admin.site.register(WeNeed)
admin.site.register(History)
