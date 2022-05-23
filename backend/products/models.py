from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Product(models.Model):
   product_name: models.CharField(max_length=50)
   product_description: models.CharField(max_length=50)
   created_at = models.DateTimeField(auto_now_add=True)
   created_by = models.ForeignKey(User, related_name="products", on_delete=models.CASCADE)