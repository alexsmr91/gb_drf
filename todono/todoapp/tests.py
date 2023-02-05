from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
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
	'14a47267-b7cd-46aa-9f12-ffc54a53069c',
	'6af74a25-883c-4819-a775-92b4a6f3e603',
	'd4bb3647-f55c-40d1-b66b-fd49960cfed9',
]


class TestViewSets(TestCase):
	fixtures = ['fixtures/tests.json']

	def test_get_list(self):
		factory = APIRequestFactory()
		request = factory.get('/api/v1.0/projects/')
		view = ProjectsModelViewSet.as_view({'get': 'list'})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_create_admin(self):
		factory = APIRequestFactory()
		request = factory.post('/api/v1.0/users/', {
			"email": "ee@mddma.il", "password_hash": "2cf24dba5fd0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
			"username": "assssfdsss", "first_name": "Aleddx", "last_name": "Didd", "birthday": "1990-07-02"
		}, format='json')
		admin = CustomUsers.objects.create_superuser('admin', 'a@dm.in', 'admin')
		force_authenticate(request, admin)
		view = CustomUsersModelViewSet.as_view({'post': 'create'})
		response = view(request)
		print(response.data)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_get_detail(self):
		client = APIClient()
		response = client.get(f'/api/v1.0/users/{users[0]}/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_edit_guest(self):
		client = APIClient()
		response = client.put(f'/api/v1.0/users/{users[1]}/', {'first_name': 'Pavel', "last_name": "Ivanov"})
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_edit_admin(self):
		client = APIClient()
		CustomUsers.objects.create_superuser('admin', 'a@adm.in', 'admin')
		client.login(username='admin', password='admin')
		user = UserDC(1, "Pavel", "Ivanov")
		response = client.patch(f'/api/v1.0/users/{users[user.id]}/', {'first_name': user.name, "last_name": user.surname})
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		user_db = CustomUsers.objects.get(id=users[user.id])
		self.assertEqual(user_db.first_name, user.name)
		self.assertEqual(user_db.last_name, user.surname)
		client.logout()


class TestBookViewSet(APITestCase):
	fixtures = ['fixtures/tests.json']

	def test_get_list_api_test_case(self):
		response = self.client.get('/api/v1.0/projects/')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_edit_admin_api_test_case(self):
		CustomUsers.objects.create_superuser('admin', 'a@dm.in', 'admin')
		self.client.login(username='admin', password='admin')
		user = UserDC(2, "Igor", "Sidorov")
		response = self.client.patch(f'/api/v1.0/users/{users[user.id]}/', {'first_name': user.name, "last_name": user.surname})
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		user_db = CustomUsers.objects.get(id=users[user.id])
		self.assertEqual(user_db.first_name, user.name)
		self.assertEqual(user_db.last_name, user.surname)
