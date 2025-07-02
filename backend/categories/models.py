from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=65, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
