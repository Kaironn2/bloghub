from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from posts.models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrReadOnly


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related('author', 'category')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_context(self):
        return {'request': self.request}
