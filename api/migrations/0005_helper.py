# Generated by Django 2.2.17 on 2021-07-31 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_weneed'),
    ]

    operations = [
        migrations.CreateModel(
            name='Helper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('dates', models.CharField(default='[]', max_length=200)),
                ('user', models.CharField(default='[]', max_length=200)),
            ],
        ),
    ]
