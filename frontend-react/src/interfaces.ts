// Base Interfaces
export interface Areas {
  idarea: number;
  idunidad: number;
  descripcion: string;
  estatus: number;
}

export interface Articulos {
  idarticulo: number;
  descripcion: string;
  nombrearticulo: string;
  revista: string;
  doi: string;
  url: string;
  paispublicacion: string;
  añopublicacion: string;
  estatus: number;
}

export interface Carreras {
  idcarrera: number;
  descripcion: string;
}

export interface Especialidad {
  idespecialidad: number;
  descripcion: string;
}

export interface Herramientas {
  idherramienta: number;
  descripcion: string;
}

export interface Lineas {
  idlineas: number;
  descripcion: string;
}

export interface Unidades {
  idunidad: number;
  descripcion: string;
}

export interface Usuarios {
  idusuario: number;
  usuario: string;
  contraseña: string;
  estatus: number;
  rol: string;
}

// Complex Interfaces with Relationships
export interface Niveledu {
  idniveledu: number;
  idespecialidad: number;
  nivel: string;
  idcarrera: number;
}

export interface Investigador {
  idinvestigador: number;
  idarea: number;
  idniveledu: number;
  nombre: string;
  apellido: string;
  esjefedearea: number;
  estatus: number;
  idsnii?: number | null;
  sueldo: number;
}

export interface Estudiantes {
  idestudiante: number;
  idtipoestudiante: number;
  idcarrera: number;
  nombre: string;
  idinvestigador: number;
  fechainicio: string; // Date
  fechatermino: string; // Date
  escuela: string;
  telefono: string;
  correo: string;
  estatus: number;
  sueldo: number;
}

export interface Eventos {
  idevento: number;
  idtipoevento: number;
  descripcion: string;
  nombre: string;
  lugar: string;
  empresa: string;
  fechainicio: string; // Date
  fechafin: string; // Date
  estatus: number;
}

export interface Proyectos {
  idproyecto: number;
  descripcion: string;
  nombre: string;
  fechainicio: string; // Date
  fechatermino?: string | null; // Date
  estatus: number;
  ingresos: number;
  idarea: number;
}

export interface Snii {
  idsnii: number;
  idnivelsnii: number;
  snii: string;
  fechaasignación: string; // Date
}

// Intermediate Relation Interfaces
export interface Detallearticulosinvestigador {
  iddetallearticulosinvestigador: number;
  idinvestigador: number;
  idarticulo: number;
}

export interface Detalleeventosinvestigador {
  iddetalleeventosinvestigador: number;
  idinvestigador: number;
  idevento: number;
}

export interface Detallelineasinvestigador {
  detallelineasinvestigador: number;
  idinvestigador: number;
  idlinea: number;
}

export interface Detalleproyectoinvestigador {
  iddetalleproyectoinvestigador: number;
  idinvestigador: number;
  idproyecto: number;
  rol: string;
}

export interface Detallesherramientasproyectos {
  iddetalleherramienta: number;
  idproyecto: number;
  idherramienta: number;
}

// Lookup Interfaces
export interface Tipoestudiante {
  idtipoestudiante: number;
  descripcion: string;
}

export interface Tipoevento {
  idtipoevento: number;
  descripcion: string;
}

export interface Nivelsnii {
  idnivelsnii: number;
  descripcion: string;
}

export interface AreasDetailed extends Areas {
  unidad?: Unidades;
}

// Detailed Interfaces with Nested Relationships
export interface InvestigadorDetailed extends Investigador {
  area?: {
    id: number;
    descripcion: string;
  };
  nivel_edu?: {
    id: number;
    nivel: string;
    especialidad?: string;
  };
  snii_info?: {
    id: number;
    snii: string;
    nivel?: string;
  };
}

export interface EstudianteDetailed extends Estudiantes {
  tipo_estudiante?: {
    id: number;
    descripcion: string;
  };
  carrera?: {
    id: number;
    descripcion: string;
  };
  investigador?: {
    id: number;
    nombre: string;
  };
}

export interface EventoDetailed extends Eventos {
  tipo_evento?: {
    id: number;
    descripcion: string;
  };
}

export interface ProyectoDetailed extends Proyectos {
  area?: {
    id: number;
    descripcion: string;
  };
}
