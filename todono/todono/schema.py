import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Projects, ToDoNotes
from app.models import CustomUsers


class ProjectsType(DjangoObjectType):
    class Meta:
        model = Projects
        fields = '__all__'


class NotesType(DjangoObjectType):
    class Meta:
        model = ToDoNotes
        fields = '__all__'


class UsersType(DjangoObjectType):
    class Meta:
        model = CustomUsers
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectsType)
    all_notes = graphene.List(NotesType)
    all_users = graphene.List(UsersType)

    def resolve_all_projects(root, info):
        return Projects.objects.all()

    def resolve_all_notes(root, info):
        return ToDoNotes.objects.all()

    def resolve_all_users(root, info):
        return CustomUsers.objects.all()


schema = graphene.Schema(query=Query)

"""
Examples:
List users:
{
  allUsers {
    firstName
    lastName
    lastLogin
  }
}
----------------------------------------
List notes with owner`s name and surname
{
  allNotes{
    title
    text
    owner {
      firstName
      lastName
    }
  }
}  
----------------------------------------
Users with list of they projects:
{
  allUsers {
    firstName
    lastName
    projectsSet {
      projectName
      description
    }
  }
}
"""