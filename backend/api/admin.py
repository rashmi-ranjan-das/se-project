from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Guest)
class Guestadmin(admin.ModelAdmin):
    list_display=['id','name','duration','advanced_paid','room_choices','arrival']

@admin.register(room_booked)
class roomBookedadmin(admin.ModelAdmin):
    list_display=['guest','room_number','unique_token_number']

@admin.register(catering_orders)
class cateringOrdersadmin(admin.ModelAdmin):
    list_display=['guest','breakfast_quantity','lunch_quantity','snacks_quantity','dinner_quantity']

@admin.register(room_charges)
class roomChargesadmin(admin.ModelAdmin):
    list_display=['room_type','room_charges']

@admin.register(hotel)
class hoteladmin(admin.ModelAdmin):
    list_display=['room_type','room_availability']

@admin.register(frequent_users)
class frequentUsersadmin(admin.ModelAdmin):
    list_display=['guest','frequency','UIN']


