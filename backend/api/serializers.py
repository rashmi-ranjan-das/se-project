from django.db.models import fields
from rest_framework import serializers
from .models import catering_orders, Guest, room_booked, room_charges, hotel, frequent_users
import random

def getRoomNumber(room_type):
    if(room_type == "non_ac_single"):
        return int("100" + str(random.randint(1,9)))
    elif(room_type == "non_ac_double"):
        return int("200" + str(random.randint(1,9)))
    elif(room_type == "ac_single"):
        return int("300" + str(random.randint(1,9)))
    else:
        return int("400" + str(random.randint(1,9)))

def getUTN(validated_data):
    return validated_data['name'] + "UN0012" + "MNGRCP" + str(random.randint(1000,9999))

class hotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = hotel
        fields = '__all__'

class roomChargesSerializer(serializers.ModelSerializer):
    class Meta:
        model = room_charges
        fields = '__all__'

class frequentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = frequent_users 
        fields = '__all__'

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'

    def create(self, validated_data):
        print("@@@@@@@@@@@", validated_data)
        UTN = getUTN(validated_data)
        guest = Guest(**validated_data)
        room = room_booked(guest = guest,guest_name=guest.name, room_number = getRoomNumber(validated_data['room_choices']), unique_token_number = UTN)
        frequent_guest = frequent_users(guest = guest.name, frequency = 1, UIN=guest.name+"AB00"+str(random.randint(50, 90)))
        available_rooms = hotel.objects.get(room_type = validated_data['room_choices'])
        if(available_rooms.room_availability > 0):
            available_rooms.room_availability -= 1
            available_rooms.save()
            guest.save()
            room.save()
            frequent_guest.save()
            return guest

class RoomBookedSerializer(serializers.ModelSerializer):
    class Meta:
        model = room_booked
        fields = '__all__'

class CateringOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = catering_orders
        fields = '__all__'

    def create(self, validated_data):
        order = catering_orders.objects.filter(guest = validated_data['guest'])
        print("##############", order)
        if order:
            self.update(validated_data)
        else:
            order = catering_orders.objects.create(**validated_data)
            return order

    def update(self,validated_data):
        last_order = catering_orders.objects.get(guest = validated_data['guest']) 
        last_order.breakfast_quantity += int(validated_data['breakfast_quantity'])
        last_order.lunch_quantity += int(validated_data['lunch_quantity'])
        last_order.dinner_quantity += int(validated_data['dinner_quantity'])
        last_order.snacks_quantity += int(validated_data['snacks_quantity'])
        last_order.save()
        return last_order