from django.urls import path, include

urlpatterns = [
    path('', include('categories.interfaces.api.v1.urls')),
]
