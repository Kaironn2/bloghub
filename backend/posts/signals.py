from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify

from .models import Post


@receiver(post_save, sender=Post)
def create_slug_on_post_save(sender, instance, created, **kwargs):
    if created and not instance.slug:
        instance.slug = slugify(f'{instance.title}-{instance.id}')
        instance.save(update_fields=['slug'])
