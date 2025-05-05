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



from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, viewsets, filters
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes,authentication_classes, action
from django.middleware.csrf import get_token
from .authentication import CookieJWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import os
import subprocess

@api_view(["POST"])
@permission_classes([AllowAny])  # ⚠️ Cambia esto a IsAdminUser o permisos seguros en producción
def restore_database_view(request):
    dump_file = request.FILES.get('dump_file')

    if not dump_file:
        return Response({"message": "No dump file uploaded", "ok": False}, status=status.HTTP_400_BAD_REQUEST)

    # Guardar temporalmente el dump
    temp_path = os.path.join(settings.BASE_DIR, "temp_dump.sql")
    with open(temp_path, "wb+") as dest:
        for chunk in dump_file.chunks():
            dest.write(chunk)

    # Datos de la base de datos desde settings.py
    db_name = settings.DATABASES["default"]["NAME"]
    db_user = settings.DATABASES["default"]["USER"]
    db_pass = settings.DATABASES["default"]["PASSWORD"]
    db_host = settings.DATABASES["default"].get("HOST", "localhost")

    try:
        # 1. Eliminar y crear la base de datos nuevamente
        drop_create_cmd = f'mysql -u {db_user} -p{db_pass} -h {db_host} -e "DROP DATABASE IF EXISTS {db_name}; CREATE DATABASE {db_name};"'
        subprocess.run(drop_create_cmd, shell=True, check=True)

        # 2. Restaurar el dump
        restore_cmd = f'mysql -u {db_user} -p{db_pass} -h {db_host} {db_name} < {temp_path}'
        subprocess.run(restore_cmd, shell=True, check=True)

        return Response({"message": "Database restored successfully", "ok": True}, status=status.HTTP_200_OK)

    except subprocess.CalledProcessError as e:
        return Response({"message": f"Restore failed: {str(e)}", "ok": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

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




class InvestigatorValueView(APIView):
    """
    API endpoint that returns the calculated value of each investigator
    based on the specified criteria.
    """
    
    def get(self, request):
        try:
            with connection.cursor() as cursor:
                # SQL query to calculate investigator values
                cursor.execute("""
                    WITH 
    EstudiantesPoints AS (
        SELECT 
            IdInvestigador,
            SUM(
                CASE 
                    WHEN IdTipoEstudiante = 3 THEN -- Maestría
                        CASE 
                            WHEN Progreso = 'deserto' THEN 1
                            WHEN Progreso = 'egresado' THEN 3
                            WHEN Progreso = 'titulado' THEN 5
                            ELSE 0
                        END
                    WHEN IdTipoEstudiante = 4 THEN -- Doctorado
                        CASE 
                            WHEN Progreso = 'deserto' THEN 3
                            WHEN Progreso = 'egresado' THEN 5
                            WHEN Progreso = 'titulado' THEN 8
                            ELSE 0
                        END
                    ELSE 0
                END
            ) AS Points
        FROM 
            estudiantes
        GROUP BY 
            IdInvestigador
    ),
    
    LineasPoints AS (
        SELECT 
            dl.IdInvestigador,
            COUNT(*) * 5 AS Points
        FROM 
            detlineas dl
            JOIN lineas l ON dl.IdLinea = l.IdLinea
        WHERE 
            l.reconocido = 1
        GROUP BY 
            dl.IdInvestigador
    ),
    
    ProyectosPoints AS (
        SELECT 
            dp.IdInvestigador,
            SUM(
                CASE 
                    WHEN p.Estado = 'En proceso' THEN 3
                    WHEN p.Estado = 'Terminado' THEN 7
                    WHEN p.Estado = 'Instalado' THEN 10
                    ELSE 0
                END
            ) AS Points
        FROM 
            detproyectos dp
            JOIN proyectos p ON dp.IdProyecto = p.IdProyecto
        GROUP BY 
            dp.IdInvestigador
    ),
    
    ArticulosPoints AS (
        SELECT 
            da.IdInvestigador,
            SUM(
                CASE 
                    WHEN da.OrdenAutor = 1 THEN
                        CASE 
                            WHEN a.Progreso = 'en proceso' THEN 3
                            WHEN a.Progreso = 'terminado' THEN 5
                            WHEN a.Progreso = 'aceptado' THEN 7
                            WHEN a.Progreso = 'publicado' THEN 10
                            ELSE 0
                        END
                    ELSE 3
                END
            ) AS Points
        FROM 
            detarticulos da
            JOIN articulos a ON da.IdArticulo = a.IdArticulo
        GROUP BY 
            da.IdInvestigador
    ),
    
    EventosPoints AS (
        SELECT 
            de.IdInvestigador,
            SUM(
                CASE 
                    WHEN de.IdRolEvento = 1 THEN -- As presenter (ponente)
                        CASE 
                            WHEN e.IdTipoEvento = 1 THEN 3 -- Congresos
                            WHEN e.IdTipoEvento = 2 THEN 1 -- Talleres
                            WHEN e.IdTipoEvento = 3 THEN 5 -- Conferencias
                            WHEN e.IdTipoEvento = 4 THEN 3 -- Diplomados
                            WHEN e.IdTipoEvento = 5 THEN 1 -- Charlas
                            ELSE 0
                        END
                    ELSE 0
                END
            ) AS Points
        FROM 
            deteventos de
            JOIN eventos e ON de.IdEvento = e.IdEvento
        GROUP BY 
            de.IdInvestigador
    )

SELECT 
    inv.IdInvestigador,
    inv.Nombre AS Investigador,
    aa.Nombre as Area,
    COALESCE(ep.Points, 0) AS PuntosEstudiantes,
    COALESCE(lp.Points, 0) AS PuntosLineasReconocidas,
    COALESCE(pp.Points, 0) AS PuntosProyectos,
    COALESCE(ap.Points, 0) AS PuntosArticulos,
    COALESCE(evp.Points, 0) AS PuntosEventos,
    COALESCE(ep.Points, 0) + 
    COALESCE(lp.Points, 0) + 
    COALESCE(pp.Points, 0) + 
    COALESCE(ap.Points, 0) + 
    COALESCE(evp.Points, 0) AS PuntajeTotal
FROM 
    investigadores inv
LEFT JOIN EstudiantesPoints ep ON inv.IdInvestigador = ep.IdInvestigador
LEFT JOIN LineasPoints lp ON inv.IdInvestigador = lp.IdInvestigador
LEFT JOIN ProyectosPoints pp ON inv.IdInvestigador = pp.IdInvestigador
LEFT JOIN ArticulosPoints ap ON inv.IdInvestigador = ap.IdInvestigador
LEFT JOIN EventosPoints evp ON inv.IdInvestigador = evp.IdInvestigador
inner join areas aa on inv.IdArea = aa.IdArea 
ORDER BY 
    PuntajeTotal DESC
limit 10;
                """)
                
                # Convert the query results to a list of dictionaries
                columns = [col[0] for col in cursor.description]
                result = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
                return Response({
                    "investigadores": result,
                })
                
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )