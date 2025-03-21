# Generated by Django 5.1.7 on 2025-03-20 23:51

import django.db.models.deletion
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
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
                ('estatus', models.IntegerField(db_column='Estatus')),
            ],
            options={
                'db_table': 'Areas',
            },
        ),
        migrations.CreateModel(
            name='Articulos',
            fields=[
                ('idarticulo', models.AutoField(db_column='IdArticulo', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
                ('nombrearticulo', models.CharField(db_column='NombreArticulo', max_length=255)),
                ('revista', models.CharField(db_column='Revista', max_length=100)),
                ('doi', models.CharField(db_column='DOI', max_length=100)),
                ('url', models.CharField(db_column='URL', max_length=255)),
                ('paispublicacion', models.CharField(db_column='PaisPublicacion', max_length=50)),
                ('añopublicacion', models.TextField(db_column='AñoPublicacion')),
                ('estatus', models.IntegerField(db_column='Estatus')),
            ],
            options={
                'db_table': 'Articulos',
            },
        ),
        migrations.CreateModel(
            name='Carreras',
            fields=[
                ('idcarrera', models.AutoField(db_column='IdCarrera', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'Carreras',
            },
        ),
        migrations.CreateModel(
            name='Especialidad',
            fields=[
                ('idespecialidad', models.AutoField(db_column='IdEspecialidad', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'Especialidad',
            },
        ),
        migrations.CreateModel(
            name='Eventos',
            fields=[
                ('idevento', models.AutoField(db_column='IdEvento', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
                ('nombre', models.CharField(db_column='Nombre', max_length=100)),
                ('lugar', models.CharField(db_column='Lugar', max_length=100)),
                ('empresa', models.CharField(db_column='Empresa', max_length=100)),
                ('fechainicio', models.DateField(db_column='FechaInicio')),
                ('fechafin', models.DateField(db_column='FechaFin')),
                ('estatus', models.IntegerField(db_column='Estatus')),
            ],
            options={
                'db_table': 'Eventos',
            },
        ),
        migrations.CreateModel(
            name='Herramientas',
            fields=[
                ('idherramienta', models.AutoField(db_column='IdHerramienta', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'Herramientas',
            },
        ),
        migrations.CreateModel(
            name='Lineas',
            fields=[
                ('idlineas', models.AutoField(db_column='IdLineas', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'Lineas',
            },
        ),
        migrations.CreateModel(
            name='Nivelsnii',
            fields=[
                ('idnivelsnii', models.AutoField(db_column='IdNivelSNII', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'NivelSNII',
            },
        ),
        migrations.CreateModel(
            name='Tipoestudiante',
            fields=[
                ('idtipoestudiante', models.AutoField(db_column='IdTipoEstudiante', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'TipoEstudiante',
            },
        ),
        migrations.CreateModel(
            name='Tipoevento',
            fields=[
                ('idtipoevento', models.AutoField(db_column='IdTipoEvento', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'TipoEvento',
            },
        ),
        migrations.CreateModel(
            name='Unidades',
            fields=[
                ('idunidad', models.AutoField(db_column='IdUnidad', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
            ],
            options={
                'db_table': 'Unidades',
            },
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('idusuario', models.AutoField(db_column='IdUsuario', primary_key=True, serialize=False)),
                ('usuario', models.CharField(db_column='Usuario', max_length=50)),
                ('contraseña', models.CharField(db_column='Contraseña', max_length=50)),
                ('estatus', models.IntegerField(db_column='Estatus')),
                ('rol', models.CharField(db_column='Rol', max_length=50)),
            ],
            options={
                'db_table': 'Usuarios',
            },
        ),
        migrations.CreateModel(
            name='Investigador',
            fields=[
                ('idinvestigador', models.AutoField(db_column='IdInvestigador', primary_key=True, serialize=False)),
                ('nombre', models.CharField(db_column='Nombre', max_length=50)),
                ('apellido', models.CharField(db_column='Apellido', max_length=50)),
                ('esjefedearea', models.IntegerField(db_column='EsJefeDeArea')),
                ('estatus', models.IntegerField(db_column='Estatus')),
                ('sueldo', models.IntegerField(db_column='Sueldo')),
                ('idarea', models.ForeignKey(db_column='IdArea', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.areas')),
            ],
            options={
                'db_table': 'Investigador',
            },
        ),
        migrations.CreateModel(
            name='Detalleeventosinvestigador',
            fields=[
                ('iddetalleeventosinvestigador', models.AutoField(db_column='IdDetalleEventosInvestigador', primary_key=True, serialize=False)),
                ('idevento', models.ForeignKey(db_column='IdEvento', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.eventos')),
                ('idinvestigador', models.ForeignKey(db_column='IdInvestigador', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.investigador')),
            ],
            options={
                'db_table': 'DetalleEventosInvestigador',
            },
        ),
        migrations.CreateModel(
            name='Detallearticulosinvestigador',
            fields=[
                ('iddetallearticulosinvestigador', models.AutoField(db_column='IdDetalleArticulosInvestigador', primary_key=True, serialize=False)),
                ('idarticulo', models.ForeignKey(db_column='IdArticulo', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.articulos')),
                ('idinvestigador', models.ForeignKey(db_column='IdInvestigador', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.investigador')),
            ],
            options={
                'db_table': 'DetalleArticulosInvestigador',
            },
        ),
        migrations.CreateModel(
            name='Detallelineasinvestigador',
            fields=[
                ('detallelineasinvestigador', models.AutoField(db_column='DetalleLineasInvestigador', primary_key=True, serialize=False)),
                ('idinvestigador', models.ForeignKey(db_column='IdInvestigador', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.investigador')),
                ('idlinea', models.ForeignKey(db_column='IdLinea', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.lineas')),
            ],
            options={
                'db_table': 'DetalleLineasInvestigador',
            },
        ),
        migrations.CreateModel(
            name='Niveledu',
            fields=[
                ('idniveledu', models.AutoField(db_column='IdNivelEdu', primary_key=True, serialize=False)),
                ('nivel', models.CharField(db_column='Nivel', max_length=50)),
                ('idcarrera', models.ForeignKey(db_column='IdCarrera', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.carreras')),
                ('idespecialidad', models.ForeignKey(db_column='IdEspecialidad', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.especialidad')),
            ],
            options={
                'db_table': 'NivelEdu',
            },
        ),
        migrations.AddField(
            model_name='investigador',
            name='idniveledu',
            field=models.ForeignKey(db_column='IdNivelEdu', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.niveledu'),
        ),
        migrations.CreateModel(
            name='Proyectos',
            fields=[
                ('idproyecto', models.AutoField(db_column='IdProyecto', primary_key=True, serialize=False)),
                ('descripcion', models.CharField(db_column='Descripcion', max_length=50)),
                ('nombre', models.CharField(db_column='Nombre', max_length=100)),
                ('fechainicio', models.DateField(db_column='FechaInicio')),
                ('fechatermino', models.DateField(blank=True, db_column='FechaTermino', null=True)),
                ('estatus', models.IntegerField(db_column='Estatus')),
                ('ingresos', models.IntegerField()),
                ('idarea', models.ForeignKey(db_column='IdArea', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.areas')),
            ],
            options={
                'db_table': 'Proyectos',
            },
        ),
        migrations.CreateModel(
            name='Detallesherramientasproyectos',
            fields=[
                ('iddetalleherramienta', models.AutoField(db_column='IdDetalleHerramienta', primary_key=True, serialize=False)),
                ('idherramienta', models.ForeignKey(db_column='IdHerramienta', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.herramientas')),
                ('idproyecto', models.ForeignKey(db_column='IdProyecto', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.proyectos')),
            ],
            options={
                'db_table': 'DetallesHerramientasProyectos',
            },
        ),
        migrations.CreateModel(
            name='Detalleproyectoinvestigador',
            fields=[
                ('iddetalleproyectoinvestigador', models.AutoField(db_column='IdDetalleProyectoInvestigador', primary_key=True, serialize=False)),
                ('rol', models.CharField(db_column='Rol', max_length=50)),
                ('idinvestigador', models.ForeignKey(db_column='IdInvestigador', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.investigador')),
                ('idproyecto', models.ForeignKey(db_column='IdProyecto', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.proyectos')),
            ],
            options={
                'db_table': 'DetalleProyectoInvestigador',
            },
        ),
        migrations.CreateModel(
            name='Snii',
            fields=[
                ('idsnii', models.AutoField(db_column='IdSNII', primary_key=True, serialize=False)),
                ('snii', models.CharField(db_column='SNII', max_length=50)),
                ('fechaasignación', models.DateField(db_column='FechaAsignación')),
                ('idnivelsnii', models.ForeignKey(db_column='IdNivelSNII', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.nivelsnii')),
            ],
            options={
                'db_table': 'SNII',
            },
        ),
        migrations.AddField(
            model_name='investigador',
            name='idsnii',
            field=models.ForeignKey(blank=True, db_column='IdSNII', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.snii'),
        ),
        migrations.CreateModel(
            name='Estudiantes',
            fields=[
                ('idestudiante', models.AutoField(db_column='IdEstudiante', primary_key=True, serialize=False)),
                ('nombre', models.CharField(db_column='Nombre', max_length=50)),
                ('fechainicio', models.DateField(db_column='FechaInicio')),
                ('fechatermino', models.DateField(db_column='FechaTermino')),
                ('escuela', models.CharField(db_column='Escuela', max_length=100)),
                ('telefono', models.CharField(db_column='Telefono', max_length=20)),
                ('correo', models.CharField(db_column='Correo', max_length=50)),
                ('estatus', models.IntegerField(db_column='Estatus')),
                ('sueldo', models.IntegerField(db_column='Sueldo')),
                ('idcarrera', models.ForeignKey(db_column='IdCarrera', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.carreras')),
                ('idinvestigador', models.ForeignKey(db_column='IdInvestigador', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.investigador')),
                ('idtipoestudiante', models.ForeignKey(db_column='IdTipoEstudiante', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.tipoestudiante')),
            ],
            options={
                'db_table': 'Estudiantes',
            },
        ),
        migrations.AddField(
            model_name='eventos',
            name='idtipoevento',
            field=models.ForeignKey(db_column='IdTipoEvento', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.tipoevento'),
        ),
        migrations.AddField(
            model_name='areas',
            name='idunidad',
            field=models.ForeignKey(db_column='IdUnidad', on_delete=django.db.models.deletion.DO_NOTHING, to='myapp.unidades'),
        ),
    ]
