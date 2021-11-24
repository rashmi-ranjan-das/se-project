from django.shortcuts import render
from .serializers import CateringOrdersSerializer, GuestSerializer, RoomBookedSerializer, frequentUserSerializer, hotelSerializer, roomChargesSerializer
from .models import Guest, frequent_users, hotel, room_booked, room_charges, catering_orders
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
import io
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.http.response import JsonResponse
# Create your views here.

class hotelView(viewsets.ModelViewSet):
    queryset = hotel.objects.all()
    serializer_class = hotelSerializer

class roomChargesView(viewsets.ModelViewSet):
    queryset = room_charges.objects.all()
    serializer_class = roomChargesSerializer
class frequentUsersView(viewsets.ModelViewSet):
    queryset = frequent_users.objects.all()
    serializer_class = frequentUserSerializer

class GuestView(viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

    def destroy(self, request, *args, **kwargs):
        guest_id = request.parser_context['kwargs']['pk']
        guest = Guest.objects.get(pk = guest_id)
        room_type = guest.room_choices
        print("@@@@@@@@@@@", guest, room_type)
        hotel_room = hotel.objects.get(room_type=room_type)
        print("@@@@@@@@@@@@@", hotel_room)
        hotel_room.room_availability +=1
        hotel_room.save()
        return super().destroy(request, *args, **kwargs)

class RoomBookedView(viewsets.ModelViewSet):
    queryset = room_booked.objects.all()
    serializer_class = RoomBookedSerializer

class CateringView(viewsets.ModelViewSet):
    queryset = catering_orders.objects.all()
    serializer_class = CateringOrdersSerializer

@csrf_exempt
def checkout(request):
    stream = io.BytesIO(request.body)
    data = JSONParser().parse(stream)
    guest = Guest.objects.get(pk=data['guest'])
    orders = None
    if(catering_orders.objects.filter(guest = data['guest']).exists()):
        orders = catering_orders.objects.get(guest = data['guest'])
    frequent_user_check = frequent_users.objects.filter(guest = guest.name)
    guest_bill = {
        'name': guest.name,
        'room_type': guest.room_choices,
        'room_price': guest.duration * room_charges.objects.get(room_type=guest.room_choices).room_charges,
        'advance_paid': guest.advanced_paid,
        'arrival': guest.arrival,
        'days_of_stay': guest.duration,
        'tax': 345,
        'frequent': False,
        'total_price': guest.duration * room_charges.objects.get(room_type=guest.room_choices).room_charges - guest.advanced_paid + 345,
        'discount': 0,
        'breakfast_price': 0,
        'lunch_price': 0,
        'dinner_price': 0,
        'snacks_price': 0
    }
    if(orders):
        guest_bill['breakfast']= orders.breakfast_quantity,
        guest_bill['lunch']= orders.lunch_quantity,
        guest_bill['dinner']= orders.dinner_quantity,
        guest_bill['snacks']= orders.snacks_quantity,
        guest_bill['breakfast_price']= orders.breakfast_quantity * 100,
        guest_bill['lunch_price']= orders.lunch_quantity * 200,
        guest_bill['dinner_price']= orders.dinner_quantity * 200,
        guest_bill['snacks_price']= orders.snacks_quantity * 60,
        guest_bill['total_price']= orders.breakfast_quantity * 100 +  orders.lunch_quantity * 200 + orders.dinner_quantity * 200 + orders.snacks_quantity * 60 + guest_bill['total_price']
    if(len(frequent_user_check) >= 5):
        guest_bill['frequent'] = True
        guest_bill['discount'] = guest_bill['total_price'] * 10/100
        guest_bill['total_price'] = guest_bill['total_price'] - guest_bill['discount']
    return JsonResponse(guest_bill)