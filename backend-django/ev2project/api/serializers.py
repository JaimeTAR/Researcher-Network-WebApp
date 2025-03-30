from rest_framework import serializers
from .models import (
    Areas, Articulos, Carreras, Detarticulos, Deteventos, Detherramientas, 
    Detlineas, Detproyectos, Especialidad, Estudiantes, Eventos, Herramientas, 
    Investigadores, Jefesarea, Lineas, Niveleducacion, Nivelsnii, Proyectos, 
    Rolesevento, Snii, Tipodeeventos, Tipoestudiantes, Tipoherramientas, 
    Unidades, Usuario
)
class TipoEventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipodeeventos
        fields = '__all__'

class TipoEstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipoestudiantes
        fields = '__all__'

class TipoHerramientasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipoherramientas
        fields = '__all__'


class UnidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidades
        fields = '__all__'

class AreasSerializer(serializers.ModelSerializer):
    idunidad = UnidadesSerializer()
    class Meta:
        model = Areas
        fields = '__all__'

class ArticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulos
        fields = '__all__'

class CarrerasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carreras
        fields = '__all__'

class DetarticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detarticulos
        fields = '__all__'

class DetEventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deteventos
        fields = '__all__'

class DetHerramientasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detherramientas
        fields = '__all__'

class DetLineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detlineas
        fields = '__all__'

class DetProyectosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detproyectos
        fields = '__all__'

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'

class NivelEducacionSerializer(serializers.ModelSerializer):
    idespecialidad = EspecialidadSerializer()
    class Meta:
        model = Niveleducacion
        fields = '__all__'
        
class NivelSniiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivelsnii
        fields = '__all__'

class SniiSerializer(serializers.ModelSerializer):
    idnivelsnii = NivelSniiSerializer()
    class Meta:
        model = Snii
        fields = '__all__'

class InvestigadoresSerializer(serializers.ModelSerializer):
    idarea = AreasSerializer()
    idsnii = SniiSerializer()
    idniveledu = NivelEducacionSerializer()
    class Meta:
        model = Investigadores
        fields = '__all__'

class EstudiantesSerializer(serializers.ModelSerializer):
    idtipoestudiante = TipoEstudiantesSerializer()
    idcarreras = CarrerasSerializer()
    idinvestigador = InvestigadoresSerializer()
    class Meta:
        model = Estudiantes
        fields = '__all__'

class EventosSerializer(serializers.ModelSerializer):
    idtipoevento = TipoEventosSerializer()
    class Meta:
        model = Eventos
        fields = '__all__'

class HerramientasSerializer(serializers.ModelSerializer):
    idtipoherramienta = TipoHerramientasSerializer()
    class Meta:
        model = Herramientas
        fields = '__all__'


class JefesAreaSerializer(serializers.ModelSerializer):
    idarea = AreasSerializer()
    idinvestigador = InvestigadoresSerializer()
    class Meta:
        model = Jefesarea
        fields = '__all__'

class LineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineas
        fields = '__all__'



class ProyectosSerializer(serializers.ModelSerializer):
    idlider = InvestigadoresSerializer()
    class Meta:
        model = Proyectos
        fields = '__all__'

class RolesEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rolesevento
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):
    idinvestigador = InvestigadoresSerializer()
    class Meta:
        model = Usuario
        fields = '__all__'