"""
URL configuration for academarket project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from . import views
from .views import SignUpView, SignInView, GetUserInfoView, GetPortfolioView
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView, TokenObtainPairView


urlpatterns = [
    # API endpoints
    path('sign_up', SignUpView.as_view(), name='sign_up'),
    path('sign_in', SignInView.as_view(), name='sign_in'),
    path('user_info', GetUserInfoView.as_view(), name='user_info'),
    # Auth endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Needs trailing slash, don't remove
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'), # Needs trailing slash, don't remove
    # Portfolio endpoints
    path('get_portfolio', GetPortfolioView.as_view(), name='get_portfolio'),
]
