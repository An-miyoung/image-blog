from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from django.shortcuts import resolve_url
from django.core.mail import send_mail
from django.core.validators import RegexValidator
from django.template.loader import render_to_string


class User(AbstractUser):
    # class GenderChoices(models.TextChoices):
    #     FEMALE = "F", "여성"
    #     MALE = "M", "남성"
    #     UNISEX = "U", "알리지않음"

    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField("self", blank=True)

    # first_name, last_name, email은 AbstractUser가 기본으로 제공한다. 선언한 필요없음
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(
        max_length=13,
        validators=[RegexValidator(r"^010-?[1-9]\d{3}-?\d{4}$")],
        blank=True,
    )
    # gender = models.CharField(max_length=1, choices=GenderChoices.choices, blank=True)
    avatar = models.ImageField(blank=True, upload_to="accounts/avatar/%Y/%m/%d")

    @property
    def name(self):
        return f"{self.last_name} {self.first_name}"

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)

    def send_welcome_email(self):
        subject = render_to_string(
            "accounts/welcome_email_subject.txt", {"user": self,}
        )
        content = render_to_string(
            "accounts/welcome_email_content.txt", {"user": self,}
        )
        sender_email = "noonchicat@naver.com"
        send_mail(subject, content, sender_email, [self.email], fail_silently=False)
