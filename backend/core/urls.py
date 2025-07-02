from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/<str:version>/authentication/', include('authentication.urls')),
    path('api/<str:version>/authors/', include('authors.interfaces.api.urls')),
    path('api/<str:version>/categories/', include('categories.interfaces.api.urls')),
    path('api/<str:version>/posts/', include('posts.interfaces.api.urls')),
]
