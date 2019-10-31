from .views import Test, TestApiDetail
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('test/', Test.as_view()),
    path('test/<int:pk>/', TestApiDetail.as_view())
]