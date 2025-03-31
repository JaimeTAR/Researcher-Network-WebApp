from .models import (
    Areas, Articulos, Carreras, Detarticulos, Deteventos, Detherramientas, 
    Detlineas, Detproyectos, Especialidad, Estudiantes, Eventos, Herramientas, 
    Investigadores, Jefesarea, Lineas, Niveleducacion, Nivelsnii, Proyectos, 
    Rolesevento, Snii, Tipodeeventos, Tipoestudiantes, Tipoherramientas, 
    Unidades
)
from .serializers import (
    AreasSerializer, ArticulosSerializer, CarrerasSerializer, DetarticulosSerializer, 
    DetEventosSerializer, DetHerramientasSerializer, DetLineasSerializer, 
    DetProyectosSerializer, EspecialidadSerializer, EstudiantesSerializer, 
    EventosSerializer, HerramientasSerializer, InvestigadoresSerializer, 
    JefesAreaSerializer, LineasSerializer, NivelEducacionSerializer, 
    NivelSniiSerializer, ProyectosSerializer, RolesEventoSerializer, 
    SniiSerializer, TipoEventosSerializer, TipoEstudiantesSerializer, 
    TipoHerramientasSerializer, UnidadesSerializer
)

from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, viewsets, filters
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes,authentication_classes, action
from django.middleware.csrf import get_token
from .authentication import CookieJWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(["GET"])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
def check_authentication(request):
    return Response({
        "authenticated": True,
        "username": request.user.username,
        "email": request.user.email,
        "role": "admin" if request.user.is_staff == 1 else "user"
    })

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"message":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    
    response = Response()
    response.set_cookie("access_token", str(refresh.access_token), httponly=True, samesite="Lax", secure=True)
    response.set_cookie("refresh_token", str(refresh), httponly=True, samesite="Lax", secure=True)
    response.data = {"message": "Login successful", "csrfToken": get_token(request)}

    return response

@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({"message": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"message": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    # Create user
    user = User.objects.create_user(username=username, email=email, password=password)

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    response = Response({"message": "User registered successfully", "csrfToken": get_token(request)})
    response.set_cookie("access_token", str(refresh.access_token), httponly=True, samesite="Lax", secure=True)
    response.set_cookie("refresh_token", str(refresh), httponly=True, samesite="Lax", secure=True)

    return response


@api_view(["POST"])
def logout_view(request):
    response = Response({"message": "Logged out"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response


class AreasViewSet(viewsets.ModelViewSet):
    queryset = Areas.objects.all()
    serializer_class = AreasSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']
    
class ArticulosViewSet(viewsets.ModelViewSet):
    queryset = Articulos.objects.all()
    serializer_class = ArticulosSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['anopublicacion', 'paispublicacion', 'estatus']
    search_fields = ['nombrearticulo', 'nombrerevista', 'abstracto']
    ordering_fields = ['anopublicacion', 'fechapublicacion']

class CarrerasViewSet(viewsets.ModelViewSet):
    queryset = Carreras.objects.all()
    serializer_class = CarrerasSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'escuela']

class DetarticulosViewSet(viewsets.ModelViewSet):
    queryset = Detarticulos.objects.all()
    serializer_class = DetarticulosSerializer
    filterset_fields = ['idarticulo', 'idinvestigador']

class DetEventosViewSet(viewsets.ModelViewSet):
    queryset = Deteventos.objects.all()
    serializer_class = DetEventosSerializer
    filterset_fields = ['idevento', 'idinvestigador']

class DetHerramientasViewSet(viewsets.ModelViewSet):
    queryset = Detherramientas.objects.all()
    serializer_class = DetHerramientasSerializer
    filterset_fields = ['idproyecto', 'idherramienta']

class DetLineasViewSet(viewsets.ModelViewSet):
    queryset = Detlineas.objects.all()
    serializer_class = DetLineasSerializer
    filterset_fields = ['idlinea', 'idinvestigador']

class DetProyectosViewSet(viewsets.ModelViewSet):
    queryset = Detproyectos.objects.all()
    serializer_class = DetProyectosSerializer
    filterset_fields = ['idproyecto', 'idinvestigador']

class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombreespecialidad']

class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiantes.objects.all()
    serializer_class = EstudiantesSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['idtipoestudiante', 'idcarreras']
    search_fields = ['nombre']
    ordering_fields = ['fechainicio', 'fechatermino', 'sueldoestudiante']

class EventosViewSet(viewsets.ModelViewSet):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['idtipoevento']
    search_fields = ['nombreevento', 'descripcion', 'lugar']
    ordering_fields = ['fechainicio', 'fechafin']

class HerramientasViewSet(viewsets.ModelViewSet):
    queryset = Herramientas.objects.all()
    serializer_class = HerramientasSerializer
    filter_backends = [filters.SearchFilter]
    filterset_fields = ['idtipoherramienta']
    search_fields = ['nombre']

class InvestigadoresViewSet(viewsets.ModelViewSet):
    queryset = Investigadores.objects.all()
    serializer_class = InvestigadoresSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['idarea', 'idniveledu', 'activo']
    search_fields = ['nombre', 'correo']
    ordering_fields = ['nombre', 'sueldoinvestigador']

class JefesAreaViewSet(viewsets.ModelViewSet):
    queryset = Jefesarea.objects.all()
    serializer_class = JefesAreaSerializer
    filterset_fields = ['idarea', 'idinvestigador', 'activo']

class LineasViewSet(viewsets.ModelViewSet):
    queryset = Lineas.objects.all()
    serializer_class = LineasSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

class NivelEducacionViewSet(viewsets.ModelViewSet):
    queryset = Niveleducacion.objects.all()
    serializer_class = NivelEducacionSerializer
    filterset_fields = ['idespecialidad']

class NivelSniiViewSet(viewsets.ModelViewSet):
    queryset = Nivelsnii.objects.all()
    serializer_class = NivelSniiSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nivel']

class ProyectosViewSet(viewsets.ModelViewSet):
    queryset = Proyectos.objects.all()
    serializer_class = ProyectosSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'activo', 'idlider']
    search_fields = ['nombre', 'explicacion']
    ordering_fields = ['fechainicio', 'fechafin', 'importeingresos']

class RolesEventoViewSet(viewsets.ModelViewSet):
    queryset = Rolesevento.objects.all()
    serializer_class = RolesEventoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

class SniiViewSet(viewsets.ModelViewSet):
    queryset = Snii.objects.all()
    serializer_class = SniiSerializer
    filterset_fields = ['idnivelsnii']

class TipoEventosViewSet(viewsets.ModelViewSet):
    queryset = Tipodeeventos.objects.all()
    serializer_class = TipoEventosSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

class TipoEstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Tipoestudiantes.objects.all()
    serializer_class = TipoEstudiantesSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

class TipoHerramientasViewSet(viewsets.ModelViewSet):
    queryset = Tipoherramientas.objects.all()
    serializer_class = TipoHerramientasSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

class UnidadesViewSet(viewsets.ModelViewSet):
    queryset = Unidades.objects.all()
    serializer_class = UnidadesSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']
