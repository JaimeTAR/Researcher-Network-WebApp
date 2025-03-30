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
    # For read operations (displaying the name)
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
    # For read operations
    idespecialidad_detail = EspecialidadSerializer(source='idespecialidad', read_only=True)
    
    class Meta:
        model = Niveleducacion
        fields = '__all__'
        
class NivelSniiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivelsnii
        fields = '__all__'

class SniiSerializer(serializers.ModelSerializer):
    # For read operations
    idnivelsnii_detail = NivelSniiSerializer(source='idnivelsnii', read_only=True)
    
    class Meta:
        model = Snii
        fields = '__all__'

class InvestigadoresSerializer(serializers.ModelSerializer):
    # For read operations
    idarea_detail = AreasSerializer(source='idarea', read_only=True)
    idsnii_detail = SniiSerializer(source='idsnii', read_only=True)
    idniveledu_detail = NivelEducacionSerializer(source='idniveledu', read_only=True)
    
    class Meta:
        model = Investigadores
        fields = '__all__'

class EstudiantesSerializer(serializers.ModelSerializer):
    # For read operations
    idtipoestudiante_detail = TipoEstudiantesSerializer(source='idtipoestudiante', read_only=True)
    idcarreras_detail = CarrerasSerializer(source='idcarreras', read_only=True)
    idinvestigador_detail = InvestigadoresSerializer(source='idinvestigador', read_only=True)
    
    class Meta:
        model = Estudiantes
        fields = '__all__'

class EventosSerializer(serializers.ModelSerializer):
    # For read operations
    idtipoevento_detail = TipoEventosSerializer(source='idtipoevento', read_only=True)
    
    class Meta:
        model = Eventos
        fields = '__all__'

class HerramientasSerializer(serializers.ModelSerializer):
    # For read operations
    idtipoherramienta_detail = TipoHerramientasSerializer(source='idtipoherramienta', read_only=True)
    
    class Meta:
        model = Herramientas
        fields = '__all__'

class JefesAreaSerializer(serializers.ModelSerializer):
    # For read operations
    idarea_detail = AreasSerializer(source='idarea', read_only=True)
    idinvestigador_detail = InvestigadoresSerializer(source='idinvestigador', read_only=True)
    
    class Meta:
        model = Jefesarea
        fields = '__all__'

class LineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineas
        fields = '__all__'

class ProyectosSerializer(serializers.ModelSerializer):
    # For read operations
    idlider_detail = InvestigadoresSerializer(source='idlider', read_only=True)
    
    class Meta:
        model = Proyectos
        fields = '__all__'

class RolesEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rolesevento
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    # For read operations
    idinvestigador_detail = InvestigadoresSerializer(source='idinvestigador', read_only=True)
    
    class Meta:
        model = Usuario
        fields = '__all__'