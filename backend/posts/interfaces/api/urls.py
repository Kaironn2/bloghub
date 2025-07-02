from django.urls import path, include

urlpatterns = [
    path('', include('posts.interfaces.api.v1.urls')),
]
