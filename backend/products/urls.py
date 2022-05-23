from rest_framework import routers
from .views import ProductViewSet

router = routers.DefaultRouter()
router.register(r'api/products', ProductViewSet, 'products')

urlpatterns = router.urls