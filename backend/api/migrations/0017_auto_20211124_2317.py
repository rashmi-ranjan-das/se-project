# Generated by Django 3.2.5 on 2021-11-24 17:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20211124_2314'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guest',
            name='advanced_paid',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='guest',
            name='arrival',
            field=models.DateTimeField(default=datetime.datetime(2021, 11, 24, 23, 17, 1, 579636)),
        ),
    ]
