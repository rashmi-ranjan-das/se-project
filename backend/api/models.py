from django.db import models

room_choices=(('non_ac_single','non_ac_single'),
                ('non_ac_double','non_ac_double'),
                ('ac_single','ac_single'),
                ('ac_double','ac_double'))

class Guest(models.Model):
    name = models.CharField(max_length=50)
    duration=models.IntegerField()
    advanced_paid=models.IntegerField()
    room_choices=models.CharField(max_length=50,choices=room_choices,default='Pending')
    arrival=models.DateTimeField(auto_now_add=True)


class room_booked(models.Model):
    guest=models.OneToOneField(Guest,on_delete=models.CASCADE)
    room_number=models.IntegerField()
    unique_token_number=models.IntegerField(unique=True)



class catering_orders(models.Model):
    guest=models.OneToOneField(Guest,on_delete=models.CASCADE)
    breakfast_quantity=models.IntegerField(default=0)
    lunch_quantity=models.IntegerField(default=0)
    snacks_quantity=models.IntegerField(default=0)
    dinner_quantity=models.IntegerField(default=0)

class room_charges(models.Model):
    room_type=models.CharField(max_length=50,choices=room_choices)
    room_charges=models.IntegerField()

class hotel(models.Model):
    room_type=models.CharField(max_length=50,choices=room_choices)
    room_availability=models.IntegerField()

class frequent_users(models.Model):
   guest=models.CharField(max_length=50)
   frequency=models.IntegerField()
   UIN=models.IntegerField(unique=True)