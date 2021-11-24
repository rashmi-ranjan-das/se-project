# Generated by Django 3.2.5 on 2021-11-23 15:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20211123_2033'),
    ]

    operations = [
        migrations.AddField(
            model_name='room_booked',
            name='guest_name',
            field=models.CharField(default='hello', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='guest',
            name='arrival',
            field=models.DateTimeField(default=datetime.datetime(2021, 11, 23, 20, 37, 5, 177426)),
        ),
    ]