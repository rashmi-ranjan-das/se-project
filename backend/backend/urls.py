"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from collections import namedtuple
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from api import views
from django.urls.conf import include

router = routers.DefaultRouter()
router.register('hotel', views.hotelView, basename='hotel')
router.register('roomcharges', views.roomChargesView, basename='room_charge')
router.register('frequentusers', views.frequentUsersView, basename='frequent_user')
router.register('guests', views.GuestView, basename='guest')
router.register('roombooked', views.RoomBookedView, basename='room_booked')
router.register('cateringorders', views.CateringView, basename='catering')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('checkout/', views.checkout, name="checkout")
]
