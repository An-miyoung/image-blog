import re
from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    # 비밀번호를 암호화하기 위해 create 함수를 오버라이드한다.
    # 먼저 user field를 데이타에 만들고, 비밀번호를 암호화해서 저장
    def create(self, validated_data):
        user = User.objects.create(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = [
            "pk",
            "username",
            "password",
        ]


class SuggestionUserSerializer(serializers.ModelSerializer):
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
        model = User
        fields = ["username", "name", "avatar_url"]

