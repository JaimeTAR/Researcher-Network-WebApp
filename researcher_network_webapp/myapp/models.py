# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `manage=false` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Areas(models.Model):
    idarea = models.AutoField(db_column='IdArea', primary_key=True)  # Field name made lowercase.
    idunidad = models.ForeignKey('Unidades', models.DO_NOTHING, db_column='IdUnidad')  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.

    class Meta:
        db_table = 'Areas'


class Articulos(models.Model):
    idarticulo = models.AutoField(db_column='IdArticulo', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.
    nombrearticulo = models.CharField(db_column='NombreArticulo', max_length=255)  # Field name made lowercase.
    revista = models.CharField(db_column='Revista', max_length=100)  # Field name made lowercase.
    doi = models.CharField(db_column='DOI', max_length=100)  # Field name made lowercase.
    url = models.CharField(db_column='URL', max_length=255)  # Field name made lowercase.
    paispublicacion = models.CharField(db_column='PaisPublicacion', max_length=50)  # Field name made lowercase.
    añopublicacion = models.TextField(db_column='AñoPublicacion')  # Field name made lowercase. This field type is a guess.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.

    class Meta:
        
        db_table = 'Articulos'


class Carreras(models.Model):
    idcarrera = models.AutoField(db_column='IdCarrera', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'Carreras'


class Detallearticulosinvestigador(models.Model):
    iddetallearticulosinvestigador = models.AutoField(db_column='IdDetalleArticulosInvestigador', primary_key=True)  # Field name made lowercase.
    idinvestigador = models.ForeignKey('Investigador', models.DO_NOTHING, db_column='IdInvestigador')  # Field name made lowercase.
    idarticulo = models.ForeignKey(Articulos, models.DO_NOTHING, db_column='IdArticulo')  # Field name made lowercase.

    class Meta:
        
        db_table = 'DetalleArticulosInvestigador'


class Detalleeventosinvestigador(models.Model):
    iddetalleeventosinvestigador = models.AutoField(db_column='IdDetalleEventosInvestigador', primary_key=True)  # Field name made lowercase.
    idinvestigador = models.ForeignKey('Investigador', models.DO_NOTHING, db_column='IdInvestigador')  # Field name made lowercase.
    idevento = models.ForeignKey('Eventos', models.DO_NOTHING, db_column='IdEvento')  # Field name made lowercase.

    class Meta:
        
        db_table = 'DetalleEventosInvestigador'


class Detallelineasinvestigador(models.Model):
    detallelineasinvestigador = models.AutoField(db_column='DetalleLineasInvestigador', primary_key=True)  # Field name made lowercase.
    idinvestigador = models.ForeignKey('Investigador', models.DO_NOTHING, db_column='IdInvestigador')  # Field name made lowercase.
    idlinea = models.ForeignKey('Lineas', models.DO_NOTHING, db_column='IdLinea')  # Field name made lowercase.

    class Meta:
        
        db_table = 'DetalleLineasInvestigador'


class Detalleproyectoinvestigador(models.Model):
    iddetalleproyectoinvestigador = models.AutoField(db_column='IdDetalleProyectoInvestigador', primary_key=True)  # Field name made lowercase.
    idinvestigador = models.ForeignKey('Investigador', models.DO_NOTHING, db_column='IdInvestigador')  # Field name made lowercase.
    idproyecto = models.ForeignKey('Proyectos', models.DO_NOTHING, db_column='IdProyecto')  # Field name made lowercase.
    rol = models.CharField(db_column='Rol', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'DetalleProyectoInvestigador'


class Detallesherramientasproyectos(models.Model):
    iddetalleherramienta = models.AutoField(db_column='IdDetalleHerramienta', primary_key=True)  # Field name made lowercase.
    idproyecto = models.ForeignKey('Proyectos', models.DO_NOTHING, db_column='IdProyecto')  # Field name made lowercase.
    idherramienta = models.ForeignKey('Herramientas', models.DO_NOTHING, db_column='IdHerramienta')  # Field name made lowercase.

    class Meta:
        
        db_table = 'DetallesHerramientasProyectos'


class Especialidad(models.Model):
    idespecialidad = models.AutoField(db_column='IdEspecialidad', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'Especialidad'


class Estudiantes(models.Model):
    idestudiante = models.AutoField(db_column='IdEstudiante', primary_key=True)  # Field name made lowercase.
    idtipoestudiante = models.ForeignKey('Tipoestudiante', models.DO_NOTHING, db_column='IdTipoEstudiante')  # Field name made lowercase.
    idcarrera = models.ForeignKey(Carreras, models.DO_NOTHING, db_column='IdCarrera')  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50)  # Field name made lowercase.
    idinvestigador = models.ForeignKey('Investigador', models.DO_NOTHING, db_column='IdInvestigador')  # Field name made lowercase.
    fechainicio = models.DateField(db_column='FechaInicio')  # Field name made lowercase.
    fechatermino = models.DateField(db_column='FechaTermino')  # Field name made lowercase.
    escuela = models.CharField(db_column='Escuela', max_length=100)  # Field name made lowercase.
    telefono = models.CharField(db_column='Telefono', max_length=20)  # Field name made lowercase.
    correo = models.CharField(db_column='Correo', max_length=50)  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.
    sueldo = models.IntegerField(db_column='Sueldo')  # Field name made lowercase.

    class Meta:
        
        db_table = 'Estudiantes'


class Eventos(models.Model):
    idevento = models.AutoField(db_column='IdEvento', primary_key=True)  # Field name made lowercase.
    idtipoevento = models.ForeignKey('Tipoevento', models.DO_NOTHING, db_column='IdTipoEvento')  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100)  # Field name made lowercase.
    lugar = models.CharField(db_column='Lugar', max_length=100)  # Field name made lowercase.
    empresa = models.CharField(db_column='Empresa', max_length=100)  # Field name made lowercase.
    fechainicio = models.DateField(db_column='FechaInicio')  # Field name made lowercase.
    fechafin = models.DateField(db_column='FechaFin')  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.

    class Meta:
        
        db_table = 'Eventos'


class Herramientas(models.Model):
    idherramienta = models.AutoField(db_column='IdHerramienta', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'Herramientas'


class Investigador(models.Model):
    idinvestigador = models.AutoField(db_column='IdInvestigador', primary_key=True)  # Field name made lowercase.
    idarea = models.ForeignKey(Areas, models.DO_NOTHING, db_column='IdArea')  # Field name made lowercase.
    idniveledu = models.ForeignKey('Niveledu', models.DO_NOTHING, db_column='IdNivelEdu')  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50)  # Field name made lowercase.
    apellido = models.CharField(db_column='Apellido', max_length=50)  # Field name made lowercase.
    esjefedearea = models.IntegerField(db_column='EsJefeDeArea')  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.
    idsnii = models.ForeignKey('Snii', models.DO_NOTHING, db_column='IdSNII', blank=True, null=True)  # Field name made lowercase.
    sueldo = models.IntegerField(db_column='Sueldo')  # Field name made lowercase.

    class Meta:
        
        db_table = 'Investigador'


class Lineas(models.Model):
    idlineas = models.AutoField(db_column='IdLineas', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'Lineas'


class Niveledu(models.Model):
    idniveledu = models.AutoField(db_column='IdNivelEdu', primary_key=True)  # Field name made lowercase.
    idespecialidad = models.ForeignKey(Especialidad, models.DO_NOTHING, db_column='IdEspecialidad')  # Field name made lowercase.
    nivel = models.CharField(db_column='Nivel', max_length=50)  # Field name made lowercase.
    idcarrera = models.ForeignKey(Carreras, models.DO_NOTHING, db_column='IdCarrera')  # Field name made lowercase.

    class Meta:
        
        db_table = 'NivelEdu'


class Nivelsnii(models.Model):
    idnivelsnii = models.AutoField(db_column='IdNivelSNII', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'NivelSNII'


class Proyectos(models.Model):
    idproyecto = models.AutoField(db_column='IdProyecto', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100)  # Field name made lowercase.
    fechainicio = models.DateField(db_column='FechaInicio')  # Field name made lowercase.
    fechatermino = models.DateField(db_column='FechaTermino', blank=True, null=True)  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.
    ingresos = models.IntegerField()
    idarea = models.ForeignKey(Areas, models.DO_NOTHING, db_column='IdArea')  # Field name made lowercase.

    class Meta:
        
        db_table = 'Proyectos'


class Snii(models.Model):
    idsnii = models.AutoField(db_column='IdSNII', primary_key=True)  # Field name made lowercase.
    idnivelsnii = models.ForeignKey(Nivelsnii, models.DO_NOTHING, db_column='IdNivelSNII')  # Field name made lowercase.
    snii = models.CharField(db_column='SNII', max_length=50)  # Field name made lowercase.
    fechaasignación = models.DateField(db_column='FechaAsignación')  # Field name made lowercase.

    class Meta:
        
        db_table = 'SNII'


class Tipoestudiante(models.Model):
    idtipoestudiante = models.AutoField(db_column='IdTipoEstudiante', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'TipoEstudiante'


class Tipoevento(models.Model):
    idtipoevento = models.AutoField(db_column='IdTipoEvento', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'TipoEvento'


class Unidades(models.Model):
    idunidad = models.AutoField(db_column='IdUnidad', primary_key=True)  # Field name made lowercase.
    descripcion = models.CharField(db_column='Descripcion', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'Unidades'


class Usuarios(models.Model):
    idusuario = models.AutoField(db_column='IdUsuario', primary_key=True)  # Field name made lowercase.
    usuario = models.CharField(db_column='Usuario', max_length=50)  # Field name made lowercase.
    contraseña = models.CharField(db_column='Contraseña', max_length=50)  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus')  # Field name made lowercase.
    rol = models.CharField(db_column='Rol', max_length=50)  # Field name made lowercase.

    class Meta:
        
        db_table = 'Usuarios'
