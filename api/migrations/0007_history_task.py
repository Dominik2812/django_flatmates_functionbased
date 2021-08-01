# Generated by Django 2.2.17 on 2021-07-31 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210731_1712'),
    ]

    operations = [
        migrations.AddField(
            model_name='history',
            name='task',
            field=models.ForeignKey(db_column='task', default='0', max_length=330, on_delete=django.db.models.deletion.CASCADE, related_name='history', to='api.Task'),
        ),
    ]