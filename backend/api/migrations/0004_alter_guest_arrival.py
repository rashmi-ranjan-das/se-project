# Generated by Django 3.2.5 on 2021-11-22 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_hotel_room_availability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guest',
            name='arrival',
            field=models.DateTimeField(),
        ),
    ]