from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from categories.models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
