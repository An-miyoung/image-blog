import re
from django.contrib.auth import get_user_model
from django.db.models import fields
from django.http import request
from rest_framework import serializers
from .models import Post, Comment


class AuthorSerializer(serializers.ModelSerializer):
    # url 앞에 localhost 가 붙도록 url을 지정하기 위해
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):
            return author.avartar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = get_user_model()
        fields = ["username", "name", "avatar_url"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    # is_like 가 필요할때 is_like 라는 method를 호출하겠다
    is_like = serializers.SerializerMethodField("is_like_field")

    def is_like_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "created_at",
            "updated_at",
            "photo",
            "caption",
            "location",
            "tag_set",
            "is_like",
        ]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "message", "created_at"]

