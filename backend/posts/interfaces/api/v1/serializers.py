from rest_framework import serializers

from authors.interfaces.api.v1.serializers import AuthorSerializer
from categories.models import Category
from categories.interfaces.api.v1.serializers import CategorySerializer
from posts.models import Post

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'content', 'cover_image',
            'author', 'category', 'category_id'
        ]
        read_only_fields = ['slug', 'author']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        post = Post.objects.create(**validated_data)
        return post
