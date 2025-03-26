# Generated by Django 5.1.7 on 2025-03-25 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Areas',
            fields=[
                ('idarea', models.AutoField(db_column='IdArea', primary_key=True, serialize=False)),
                ('idunidad', models.IntegerField(blank=True, db_column='IdUnidad', null=True)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
            ],
            options={
                'db_table': 'areas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Articulos',
            fields=[
                ('idarticulo', models.AutoField(db_column='IdArticulo', primary_key=True, serialize=False)),
                ('nombrearticulo', models.CharField(blank=True, db_column='NombreArticulo', max_length=200, null=True)),
                ('nombrerevista', models.CharField(blank=True, db_column='NombreRevista', max_length=100, null=True)),
                ('abstracto', models.TextField(blank=True, db_column='Abstracto', null=True)),
                ('paispublicacion', models.CharField(blank=True, db_column='PaisPublicacion', max_length=100, null=True)),
                ('anopublicacion', models.IntegerField(blank=True, db_column='AnoPublicacion', null=True)),
                ('fechapublicacion', models.CharField(blank=True, db_column='FechaPublicacion', max_length=100, null=True)),
                ('doi', models.CharField(blank=True, db_column='DOI', max_length=100, null=True)),
                ('url', models.CharField(blank=True, db_column='URL', max_length=200, null=True)),
                ('estatus', models.IntegerField(blank=True, db_column='Estatus', null=True)),
            ],
            options={
                'db_table': 'articulos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Carreras',
            fields=[
                ('idcarreras', models.AutoField(db_column='IdCarreras', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
                ('escuela', models.CharField(blank=True, db_column='Escuela', max_length=100, null=True)),
            ],
            options={
                'db_table': 'carreras',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Detarticulos',
            fields=[
                ('idarticulo', models.IntegerField(db_column='IdArticulo', primary_key=True, serialize=False)),
                ('idinvestigador', models.IntegerField(db_column='IdInvestigador')),
                ('ordenautor', models.IntegerField(blank=True, db_column='OrdenAutor', null=True)),
            ],
            options={
                'db_table': 'detarticulos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Deteventos',
            fields=[
                ('idevento', models.IntegerField(db_column='IdEvento', primary_key=True, serialize=False)),
                ('idinvestigador', models.IntegerField(db_column='IdInvestigador')),
                ('idrolevento', models.IntegerField(blank=True, db_column='IdRolEvento', null=True)),
            ],
            options={
                'db_table': 'deteventos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Detherramientas',
            fields=[
                ('idproyecto', models.IntegerField(db_column='IdProyecto', primary_key=True, serialize=False)),
                ('idherramienta', models.IntegerField(db_column='IdHerramienta')),
            ],
            options={
                'db_table': 'detherramientas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Detlineas',
            fields=[
                ('idlinea', models.IntegerField(db_column='IdLinea', primary_key=True, serialize=False)),
                ('idinvestigador', models.IntegerField(db_column='IdInvestigador')),
            ],
            options={
                'db_table': 'detlineas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Detproyectos',
            fields=[
                ('idproyecto', models.IntegerField(db_column='IdProyecto', primary_key=True, serialize=False)),
                ('idinvestigador', models.IntegerField(db_column='IdInvestigador')),
                ('ordenimportancia', models.IntegerField(blank=True, db_column='OrdenImportancia', null=True)),
            ],
            options={
                'db_table': 'detproyectos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Especialidad',
            fields=[
                ('idespecialidad', models.AutoField(db_column='IdEspecialidad', primary_key=True, serialize=False)),
                ('nombreespecialidad', models.CharField(blank=True, db_column='NombreEspecialidad', max_length=100, null=True)),
            ],
            options={
                'db_table': 'especialidad',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Estudiantes',
            fields=[
                ('idestudiante', models.AutoField(db_column='IdEstudiante', primary_key=True, serialize=False)),
                ('idtipoestudiante', models.IntegerField(blank=True, db_column='IdTipoEstudiante', null=True)),
                ('idcarreras', models.IntegerField(blank=True, db_column='IdCarreras', null=True)),
                ('idinvestigador', models.IntegerField(blank=True, db_column='IdInvestigador', null=True)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
                ('fechainicio', models.CharField(blank=True, db_column='FechaInicio', max_length=100, null=True)),
                ('fechatermino', models.CharField(blank=True, db_column='FechaTermino', max_length=100, null=True)),
                ('sueldoestudiante', models.DecimalField(blank=True, db_column='SueldoEstudiante', decimal_places=2, max_digits=12, null=True)),
            ],
            options={
                'db_table': 'estudiantes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Eventos',
            fields=[
                ('idevento', models.AutoField(db_column='IdEvento', primary_key=True, serialize=False)),
                ('idtipoevento', models.IntegerField(blank=True, db_column='IdTipoEvento', null=True)),
                ('nombreevento', models.CharField(blank=True, db_column='NombreEvento', max_length=200, null=True)),
                ('descripcion', models.TextField(blank=True, db_column='Descripcion', null=True)),
                ('fechainicio', models.CharField(blank=True, db_column='FechaInicio', max_length=100, null=True)),
                ('fechafin', models.CharField(blank=True, db_column='FechaFin', max_length=100, null=True)),
                ('lugar', models.CharField(blank=True, db_column='Lugar', max_length=200, null=True)),
                ('empresainvita', models.CharField(blank=True, db_column='EmpresaInvita', max_length=100, null=True)),
            ],
            options={
                'db_table': 'eventos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Herramientas',
            fields=[
                ('idherramientas', models.AutoField(db_column='IdHerramientas', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
                ('idtipoherramienta', models.IntegerField(blank=True, db_column='IdTipoHerramienta', null=True)),
            ],
            options={
                'db_table': 'herramientas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Investigadores',
            fields=[
                ('idinvestigador', models.AutoField(db_column='IdInvestigador', primary_key=True, serialize=False)),
                ('idarea', models.IntegerField(blank=True, db_column='IdArea', null=True)),
                ('idniveledu', models.IntegerField(blank=True, db_column='IdNivelEdu', null=True)),
                ('idsnii', models.IntegerField(blank=True, db_column='IdSNII', null=True)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
                ('correo', models.CharField(blank=True, db_column='Correo', max_length=100, null=True)),
                ('celular', models.CharField(blank=True, db_column='Celular', max_length=20, null=True)),
                ('activo', models.IntegerField(blank=True, db_column='Activo', null=True)),
                ('sueldoinvestigador', models.DecimalField(blank=True, db_column='SueldoInvestigador', decimal_places=2, max_digits=12, null=True)),
            ],
            options={
                'db_table': 'investigadores',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Jefesarea',
            fields=[
                ('idjefearea', models.AutoField(db_column='IdJefeArea', primary_key=True, serialize=False)),
                ('idarea', models.IntegerField(blank=True, db_column='IdArea', null=True)),
                ('idinvestigador', models.IntegerField(blank=True, db_column='IdInvestigador', null=True)),
                ('fechainicio', models.CharField(blank=True, db_column='FechaInicio', max_length=100, null=True)),
                ('fechafin', models.CharField(blank=True, db_column='FechaFin', max_length=100, null=True)),
                ('activo', models.IntegerField(blank=True, db_column='Activo', null=True)),
            ],
            options={
                'db_table': 'jefesarea',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Lineas',
            fields=[
                ('idlinea', models.AutoField(db_column='IdLinea', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
            ],
            options={
                'db_table': 'lineas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Niveleducacion',
            fields=[
                ('idniveledu', models.AutoField(db_column='IdNivelEdu', primary_key=True, serialize=False)),
                ('idespecialidad', models.IntegerField(blank=True, db_column='IdEspecialidad', null=True)),
            ],
            options={
                'db_table': 'niveleducacion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Nivelsnii',
            fields=[
                ('idnivelsnii', models.AutoField(db_column='IdNivelSNII', primary_key=True, serialize=False)),
                ('nivel', models.CharField(blank=True, db_column='Nivel', max_length=50, null=True)),
            ],
            options={
                'db_table': 'nivelsnii',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Proyectos',
            fields=[
                ('idproyecto', models.AutoField(db_column='IdProyecto', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=200, null=True)),
                ('idlider', models.IntegerField(blank=True, db_column='IdLider', null=True)),
                ('estado', models.CharField(blank=True, db_column='Estado', max_length=50, null=True)),
                ('explicacion', models.TextField(blank=True, db_column='Explicacion', null=True)),
                ('fechainicio', models.CharField(blank=True, db_column='FechaInicio', max_length=100, null=True)),
                ('fechafin', models.CharField(blank=True, db_column='FechaFin', max_length=100, null=True)),
                ('activo', models.IntegerField(blank=True, db_column='Activo', null=True)),
                ('importeingresos', models.DecimalField(blank=True, db_column='ImporteIngresos', decimal_places=2, max_digits=12, null=True)),
            ],
            options={
                'db_table': 'proyectos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Rolesevento',
            fields=[
                ('idrolevento', models.AutoField(db_column='IdRolEvento', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=50, null=True)),
            ],
            options={
                'db_table': 'rolesevento',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Snii',
            fields=[
                ('idsnii', models.AutoField(db_column='IdSNII', primary_key=True, serialize=False)),
                ('idnivelsnii', models.IntegerField(blank=True, db_column='IdNivelSNII', null=True)),
                ('fechaasignacion', models.CharField(blank=True, db_column='FechaAsignacion', max_length=100, null=True)),
            ],
            options={
                'db_table': 'snii',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tipodeeventos',
            fields=[
                ('idtipoevento', models.AutoField(db_column='IdTipoEvento', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=50, null=True)),
            ],
            options={
                'db_table': 'tipodeeventos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tipoestudiantes',
            fields=[
                ('idtipoestudiante', models.AutoField(db_column='IdTipoEstudiante', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=50, null=True)),
            ],
            options={
                'db_table': 'tipoestudiantes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tipoherramientas',
            fields=[
                ('idtipoherramienta', models.AutoField(db_column='IdTipoHerramienta', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=50, null=True)),
            ],
            options={
                'db_table': 'tipoherramientas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Unidades',
            fields=[
                ('idunidad', models.AutoField(db_column='IdUnidad', primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, db_column='Nombre', max_length=100, null=True)),
            ],
            options={
                'db_table': 'unidades',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('idusuario', models.AutoField(db_column='IdUsuario', primary_key=True, serialize=False)),
                ('idinvestigador', models.IntegerField(blank=True, db_column='IdInvestigador', null=True)),
                ('contrasena', models.CharField(blank=True, db_column='Contrasena', max_length=255, null=True)),
                ('fechacreacion', models.CharField(blank=True, db_column='FechaCreacion', max_length=100, null=True)),
                ('ultimoacceso', models.CharField(blank=True, db_column='UltimoAcceso', max_length=100, null=True)),
                ('intentoslogin', models.IntegerField(blank=True, db_column='IntentosLogin', null=True)),
                ('activo', models.IntegerField(blank=True, db_column='Activo', null=True)),
            ],
            options={
                'db_table': 'usuario',
                'managed': False,
            },
        ),
    ]
