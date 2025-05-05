from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AreasViewSet, ArticulosViewSet, CarrerasViewSet, DetarticulosViewSet, 
    DetEventosViewSet, DetHerramientasViewSet, DetLineasViewSet, 
    DetProyectosViewSet, EspecialidadViewSet, EstudiantesViewSet, 
    EventosViewSet, HerramientasViewSet, InvestigadoresViewSet, 
    JefesAreaViewSet, LineasViewSet, NivelEducacionViewSet, 
    NivelSniiViewSet, ProyectosViewSet, RolesEventoViewSet, 
    SniiViewSet, TipoEventosViewSet, TipoEstudiantesViewSet, 
    TipoHerramientasViewSet, UnidadesViewSet,
    login_view, logout_view, signup_view, check_authentication,
    restore_database_view, InvestigatorValueView
)

# Create a router and register all viewsets
router = DefaultRouter()
router.register(r'areas', AreasViewSet)
router.register(r'articulos', ArticulosViewSet)
router.register(r'carreras', CarrerasViewSet)
router.register(r'detarticulos', DetarticulosViewSet)
router.register(r'deteventos', DetEventosViewSet)
router.register(r'detherramientas', DetHerramientasViewSet)
router.register(r'detlineas', DetLineasViewSet)
router.register(r'detproyectos', DetProyectosViewSet)
router.register(r'especialidad', EspecialidadViewSet)
router.register(r'estudiantes', EstudiantesViewSet)
router.register(r'eventos', EventosViewSet)
router.register(r'herramientas', HerramientasViewSet)
router.register(r'investigadores', InvestigadoresViewSet)
router.register(r'jefesarea', JefesAreaViewSet)
router.register(r'lineas', LineasViewSet)
router.register(r'niveleducacion', NivelEducacionViewSet)
router.register(r'nivelsnii', NivelSniiViewSet)
router.register(r'proyectos', ProyectosViewSet)
router.register(r'rolesevento', RolesEventoViewSet)
router.register(r'snii', SniiViewSet)
router.register(r'tipodeeventos', TipoEventosViewSet)
router.register(r'tipoestudiantes', TipoEstudiantesViewSet)
router.register(r'tipoherramientas', TipoHerramientasViewSet)
router.register(r'unidades', UnidadesViewSet)

urlpatterns = [
    # Main router URLs
    path('', include(router.urls)),
    path('auth/login/', login_view, name="login"),
    path('auth/logout/', logout_view, name="logout"),
    path('auth/signup/', signup_view, name="signup"),
    path('auth/check/', check_authentication, name="auth_check"),
    path('dump', restore_database_view, name="db_dump"),
    path('investigator-values/', InvestigatorValueView.as_view(), name='investigator-values'),

]  

    # # Optional: Add some custom endpoints if needed
    # path('investigadores/<int:pk>/proyectos/', InvestigadoresViewSet.as_view({'get': 'list_proyectos'})),
    # path('articulos/<int:pk>/detalle/', ArticulosViewSet.as_view({'get': 'retrieve_detalle'})),

