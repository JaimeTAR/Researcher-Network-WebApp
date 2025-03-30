from rest_framework import viewsets, filters
from .models import (
    Areas, Articulos, Carreras, Detarticulos, Deteventos, Detherramientas, 
    Detlineas, Detproyectos, Especialidad, Estudiantes, Eventos, Herramientas, 
    Investigadores, Jefesarea, Lineas, Niveleducacion, Nivelsnii, Proyectos, 
    Rolesevento, Snii, Tipodeeventos, Tipoestudiantes, Tipoherramientas, 
    Unidades, Usuario
)
from .serializers import (
    AreasSerializer, ArticulosSerializer, CarrerasSerializer, DetarticulosSerializer, 
    DetEventosSerializer, DetHerramientasSerializer, DetLineasSerializer, 
    DetProyectosSerializer, EspecialidadSerializer, EstudiantesSerializer, 
    EventosSerializer, HerramientasSerializer, InvestigadoresSerializer, 
    JefesAreaSerializer, LineasSerializer, NivelEducacionSerializer, 
    NivelSniiSerializer, ProyectosSerializer, RolesEventoSerializer, 
    SniiSerializer, TipoEventosSerializer, TipoEstudiantesSerializer, 
    TipoHerramientasSerializer, UnidadesSerializer, UsuarioSerializer
)
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

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = [filters.SearchFilter]
    filterset_fields = ['idinvestigador', 'activo']
    search_fields = ['fechacreacion', 'ultimoacceso']
    def filter_queryset(self, queryset):
        return super().filter_queryset(queryset)