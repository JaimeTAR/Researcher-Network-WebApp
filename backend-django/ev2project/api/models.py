# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Areas(models.Model):
    idarea = models.AutoField(db_column='IdArea', primary_key=True)  # Field name made lowercase.
    idunidad = models.IntegerField(db_column='IdUnidad', blank=True, null=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'areas'


class Articulos(models.Model):
    idarticulo = models.AutoField(db_column='IdArticulo', primary_key=True)  # Field name made lowercase.
    nombrearticulo = models.CharField(db_column='NombreArticulo', max_length=200, blank=True, null=True)  # Field name made lowercase.
    nombrerevista = models.CharField(db_column='NombreRevista', max_length=100, blank=True, null=True)  # Field name made lowercase.
    abstracto = models.TextField(db_column='Abstracto', blank=True, null=True)  # Field name made lowercase.
    paispublicacion = models.CharField(db_column='PaisPublicacion', max_length=100, blank=True, null=True)  # Field name made lowercase.
    anopublicacion = models.IntegerField(db_column='AnoPublicacion', blank=True, null=True)  # Field name made lowercase.
    fechapublicacion = models.CharField(db_column='FechaPublicacion', max_length=100, blank=True, null=True)  # Field name made lowercase.
    doi = models.CharField(db_column='DOI', max_length=100, blank=True, null=True)  # Field name made lowercase.
    url = models.CharField(db_column='URL', max_length=200, blank=True, null=True)  # Field name made lowercase.
    estatus = models.IntegerField(db_column='Estatus', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'articulos'


class Carreras(models.Model):
    idcarreras = models.AutoField(db_column='IdCarreras', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.
    escuela = models.CharField(db_column='Escuela', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'carreras'


class Detarticulos(models.Model):
    idarticulo = models.IntegerField(db_column='IdArticulo', primary_key=True)  # Field name made lowercase. The composite primary key (IdArticulo, IdInvestigador) found, that is not supported. The first column is selected.
    idinvestigador = models.IntegerField(db_column='IdInvestigador')  # Field name made lowercase.
    ordenautor = models.IntegerField(db_column='OrdenAutor', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'detarticulos'
        unique_together = (('idarticulo', 'idinvestigador'),)


class Deteventos(models.Model):
    idevento = models.IntegerField(db_column='IdEvento', primary_key=True)  # Field name made lowercase. The composite primary key (IdEvento, IdInvestigador) found, that is not supported. The first column is selected.
    idinvestigador = models.IntegerField(db_column='IdInvestigador')  # Field name made lowercase.
    idrolevento = models.IntegerField(db_column='IdRolEvento', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'deteventos'
        unique_together = (('idevento', 'idinvestigador'),)


class Detherramientas(models.Model):
    idproyecto = models.IntegerField(db_column='IdProyecto', primary_key=True)  # Field name made lowercase. The composite primary key (IdProyecto, IdHerramienta) found, that is not supported. The first column is selected.
    idherramienta = models.IntegerField(db_column='IdHerramienta')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'detherramientas'
        unique_together = (('idproyecto', 'idherramienta'),)


class Detlineas(models.Model):
    idlinea = models.IntegerField(db_column='IdLinea', primary_key=True)  # Field name made lowercase. The composite primary key (IdLinea, IdInvestigador) found, that is not supported. The first column is selected.
    idinvestigador = models.IntegerField(db_column='IdInvestigador')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'detlineas'
        unique_together = (('idlinea', 'idinvestigador'),)


class Detproyectos(models.Model):
    idproyecto = models.IntegerField(db_column='IdProyecto', primary_key=True)  # Field name made lowercase. The composite primary key (IdProyecto, IdInvestigador) found, that is not supported. The first column is selected.
    idinvestigador = models.IntegerField(db_column='IdInvestigador')  # Field name made lowercase.
    ordenimportancia = models.IntegerField(db_column='OrdenImportancia', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'detproyectos'
        unique_together = (('idproyecto', 'idinvestigador'),)


class Especialidad(models.Model):
    idespecialidad = models.AutoField(db_column='IdEspecialidad', primary_key=True)  # Field name made lowercase.
    nombreespecialidad = models.CharField(db_column='NombreEspecialidad', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'especialidad'


class Estudiantes(models.Model):
    idestudiante = models.AutoField(db_column='IdEstudiante', primary_key=True)  # Field name made lowercase.
    idtipoestudiante = models.IntegerField(db_column='IdTipoEstudiante', blank=True, null=True)  # Field name made lowercase.
    idcarreras = models.IntegerField(db_column='IdCarreras', blank=True, null=True)  # Field name made lowercase.
    idinvestigador = models.IntegerField(db_column='IdInvestigador', blank=True, null=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fechainicio = models.CharField(db_column='FechaInicio', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fechatermino = models.CharField(db_column='FechaTermino', max_length=100, blank=True, null=True)  # Field name made lowercase.
    sueldoestudiante = models.DecimalField(db_column='SueldoEstudiante', max_digits=12, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'estudiantes'


class Eventos(models.Model):
    idevento = models.AutoField(db_column='IdEvento', primary_key=True)  # Field name made lowercase.
    idtipoevento = models.IntegerField(db_column='IdTipoEvento', blank=True, null=True)  # Field name made lowercase.
    nombreevento = models.CharField(db_column='NombreEvento', max_length=200, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.TextField(db_column='Descripcion', blank=True, null=True)  # Field name made lowercase.
    fechainicio = models.CharField(db_column='FechaInicio', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fechafin = models.CharField(db_column='FechaFin', max_length=100, blank=True, null=True)  # Field name made lowercase.
    lugar = models.CharField(db_column='Lugar', max_length=200, blank=True, null=True)  # Field name made lowercase.
    empresainvita = models.CharField(db_column='EmpresaInvita', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'eventos'


class Herramientas(models.Model):
    idherramientas = models.AutoField(db_column='IdHerramientas', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.
    idtipoherramienta = models.IntegerField(db_column='IdTipoHerramienta', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'herramientas'


class Investigadores(models.Model):
    idinvestigador = models.AutoField(db_column='IdInvestigador', primary_key=True)  # Field name made lowercase.
    idarea = models.IntegerField(db_column='IdArea', blank=True, null=True)  # Field name made lowercase.
    idniveledu = models.IntegerField(db_column='IdNivelEdu', blank=True, null=True)  # Field name made lowercase.
    idsnii = models.IntegerField(db_column='IdSNII', blank=True, null=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.
    correo = models.CharField(db_column='Correo', max_length=100, blank=True, null=True)  # Field name made lowercase.
    celular = models.CharField(db_column='Celular', max_length=20, blank=True, null=True)  # Field name made lowercase.
    activo = models.IntegerField(db_column='Activo', blank=True, null=True)  # Field name made lowercase.
    sueldoinvestigador = models.DecimalField(db_column='SueldoInvestigador', max_digits=12, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'investigadores'


class Jefesarea(models.Model):
    idjefearea = models.AutoField(db_column='IdJefeArea', primary_key=True)  # Field name made lowercase.
    idarea = models.IntegerField(db_column='IdArea', blank=True, null=True)  # Field name made lowercase.
    idinvestigador = models.IntegerField(db_column='IdInvestigador', blank=True, null=True)  # Field name made lowercase.
    fechainicio = models.CharField(db_column='FechaInicio', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fechafin = models.CharField(db_column='FechaFin', max_length=100, blank=True, null=True)  # Field name made lowercase.
    activo = models.IntegerField(db_column='Activo', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'jefesarea'


class Lineas(models.Model):
    idlinea = models.AutoField(db_column='IdLinea', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'lineas'


class Niveleducacion(models.Model):
    idniveledu = models.AutoField(db_column='IdNivelEdu', primary_key=True)  # Field name made lowercase.
    idespecialidad = models.IntegerField(db_column='IdEspecialidad', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'niveleducacion'


class Nivelsnii(models.Model):
    idnivelsnii = models.AutoField(db_column='IdNivelSNII', primary_key=True)  # Field name made lowercase.
    nivel = models.CharField(db_column='Nivel', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'nivelsnii'


class Proyectos(models.Model):
    idproyecto = models.AutoField(db_column='IdProyecto', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=200, blank=True, null=True)  # Field name made lowercase.
    idlider = models.IntegerField(db_column='IdLider', blank=True, null=True)  # Field name made lowercase.
    estado = models.CharField(db_column='Estado', max_length=50, blank=True, null=True)  # Field name made lowercase.
    explicacion = models.TextField(db_column='Explicacion', blank=True, null=True)  # Field name made lowercase.
    fechainicio = models.CharField(db_column='FechaInicio', max_length=100, blank=True, null=True)  # Field name made lowercase.
    fechafin = models.CharField(db_column='FechaFin', max_length=100, blank=True, null=True)  # Field name made lowercase.
    activo = models.IntegerField(db_column='Activo', blank=True, null=True)  # Field name made lowercase.
    importeingresos = models.DecimalField(db_column='ImporteIngresos', max_digits=12, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proyectos'


class Rolesevento(models.Model):
    idrolevento = models.AutoField(db_column='IdRolEvento', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rolesevento'


class Snii(models.Model):
    idsnii = models.AutoField(db_column='IdSNII', primary_key=True)  # Field name made lowercase.
    idnivelsnii = models.IntegerField(db_column='IdNivelSNII', blank=True, null=True)  # Field name made lowercase.
    fechaasignacion = models.CharField(db_column='FechaAsignacion', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'snii'


class Tipodeeventos(models.Model):
    idtipoevento = models.AutoField(db_column='IdTipoEvento', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipodeeventos'


class Tipoestudiantes(models.Model):
    idtipoestudiante = models.AutoField(db_column='IdTipoEstudiante', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipoestudiantes'


class Tipoherramientas(models.Model):
    idtipoherramienta = models.AutoField(db_column='IdTipoHerramienta', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipoherramientas'


class Unidades(models.Model):
    idunidad = models.AutoField(db_column='IdUnidad', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'unidades'


class Usuario(models.Model):
    idusuario = models.AutoField(db_column='IdUsuario', primary_key=True)  # Field name made lowercase.
    idinvestigador = models.IntegerField(db_column='IdInvestigador', blank=True, null=True)  # Field name made lowercase.
    contrasena = models.CharField(db_column='Contrasena', max_length=255, blank=True, null=True)  # Field name made lowercase.
    fechacreacion = models.CharField(db_column='FechaCreacion', max_length=100, blank=True, null=True)  # Field name made lowercase.
    ultimoacceso = models.CharField(db_column='UltimoAcceso', max_length=100, blank=True, null=True)  # Field name made lowercase.
    intentoslogin = models.IntegerField(db_column='IntentosLogin', blank=True, null=True)  # Field name made lowercase.
    activo = models.IntegerField(db_column='Activo', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usuario'
