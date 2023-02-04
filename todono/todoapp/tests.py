from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from django.contrib.auth.models import User
from .views import ProjectsModelViewSet
from app.views import CustomUsersModelViewSet
from .models import CustomUsers
from dataclasses import dataclass


@dataclass
class UserDC:
	id: int
	name: str
	surname: str


users = [
	'7651606e-775a-44a9-a5be-c75e95f49006',
	'af3ee90d-bcad-4f05-8649-c8035eb8bd3a',
	'e741afd6-55e4-4d27-8b6a-a82cff543f43',
]


class TestViewSets(TestCase):
	fixtures = ['fixtures/tests.json']

	def test_get_list(self):
		factory = APIRequestFactory()
		request = factory.get('/api/projects/')
		view = ProjectsModelViewSet.as_view({'get': 'list'})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_create_admin(self):
		factory = APIRequestFactory()
		request = factory.post('/api/users/', {
			"email": "ee@mddma.il", "password_hash": "2cf24dba5fd0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
			"user_name": "assssfdsss", "first_name": "Aleddx", "last_name": "Didd", "birthday": "1990-07-02"
		}, format='json')
		admin = User.objects.create_superuser('admin', 'a@dm.in', 'admin')
		force_authenticate(request, admin)
		view = CustomUsersModelViewSet.as_view({'post': 'create'})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_get_detail(self):
		client = APIClient()
		response = client.get(f'/api/users/{users[0]}/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_edit_guest(self):
		client = APIClient()
		response = client.put(f'/api/users/{users[1]}/', {'first_name': 'Pavel', "last_name": "Ivanov"})
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_edit_admin(self):
		client = APIClient()
		User.objects.create_superuser('admin', 'a@adm.in', 'admin')
		client.login(username='admin', password='admin')
		user = UserDC(1, "Pavel", "Ivanov")
		response = client.patch(f'/api/users/{users[user.id]}/', {'first_name': user.name, "last_name": user.surname})
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		user_db = CustomUsers.objects.get(id=users[user.id])
		self.assertEqual(user_db.first_name, user.name)
		self.assertEqual(user_db.last_name, user.surname)
		client.logout()


class TestBookViewSet(APITestCase):
	fixtures = ['fixtures/tests.json']

	def test_get_list_api_test_case(self):
		response = self.client.get('/api/projects/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_edit_admin_api_test_case(self):
		User.objects.create_superuser('admin', 'a@dm.in', 'admin')
		self.client.login(username='admin', password='admin')
		user = UserDC(2, "Igor", "Sidorov")
		response = self.client.patch(f'/api/users/{users[user.id]}/', {'first_name': user.name, "last_name": user.surname})
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		user_db = CustomUsers.objects.get(id=users[user.id])
		self.assertEqual(user_db.first_name, user.name)
		self.assertEqual(user_db.last_name, user.surname)
