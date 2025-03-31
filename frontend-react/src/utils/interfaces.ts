export interface User {
  username: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthCategoriesType {
  areas: Areas[];
  nivelesEdu: NivelEducacion[];
  nivelesSnii: NivelSnii[];
  tiposEstudiantes: TipoEstudiantes[];
  carreras: Carreras[];
  investigadores: Investigadores[];
  unidades: Unidades[];
  tiposEventos: TipoEventos[];
}

// Base Types
export interface TipoEventos {
  idtipoevento: number;
  nombre: string | null;
}

export interface TipoEstudiantes {
  idtipoestudiante: number;
  nombre: string | null;
}

export interface TipoHerramientas {
  idtipoherramienta: number;
  nombre: string | null;
}

export interface Unidades {
  idunidad: number;
  nombre: string | null;
}

export interface Especialidad {
  idespecialidad: number;
  nombreespecialidad: string | null;
}

export interface Lineas {
  idlinea: number;
  nombre: string | null;
}

export interface RolesEvento {
  idrolevento: number;
  nombre: string | null;
}

export interface Carreras {
  idcarreras: number;
  nombre: string | null;
  escuela: string | null;
}

// Types with nested relationships
export interface NivelSnii {
  idnivelsnii: number;
  nivel: string | null;
}

export interface Snii {
  idsnii: number;
  idnivelsnii: number | null;
  fechaasignacion: string | null;
  idnivelsnii_detail?: NivelSnii;
}

export interface NivelEducacion {
  idniveledu: number;
  idespecialidad: number | null;
  idespecialidad_detail?: Especialidad;
}

export interface Areas {
  idarea: number;
  idunidad: number | null;
  nombre: string | null;
  idunidad_detail?: Unidades;
}

export interface Investigadores {
  idinvestigador: number;
  idarea: number | null;
  idniveledu: number | null;
  idsnii: number | null;
  nombre: string | null;
  correo: string | null;
  celular: string | null;
  activo: number | null;
  sueldoinvestigador: number | null;
  idarea_detail?: Areas;
  idsnii_detail?: Snii;
  idniveledu_detail?: NivelEducacion;
}

export interface Articulos {
  idarticulo: number;
  nombrearticulo: string | null;
  nombrerevista: string | null;
  abstracto: string | null;
  paispublicacion: string | null;
  anopublicacion: number | null;
  fechapublicacion: string | null;
  doi: string | null;
  url: string | null;
  estatus: number | null;
}

export interface Estudiantes {
  idestudiante: number;
  idtipoestudiante: number | null;
  idcarreras: number | null;
  idinvestigador: number | null;
  nombre: string | null;
  fechainicio: string | null;
  fechatermino: string | null;
  sueldoestudiante: number | null;
  idtipoestudiante_detail?: TipoEstudiantes;
  idcarreras_detail?: Carreras;
  idinvestigador_detail?: Investigadores;
}

export interface Eventos {
  idevento: number;
  idtipoevento: number | null;
  nombreevento: string | null;
  descripcion: string | null;
  fechainicio: string | null;
  fechafin: string | null;
  lugar: string | null;
  empresainvita: string | null;
  idtipoevento_detail?: TipoEventos;
}

export interface Herramientas {
  idherramientas: number;
  nombre: string | null;
  idtipoherramienta: number | null;
  idtipoherramienta_detail?: TipoHerramientas;
}

export interface JefesArea {
  idjefearea: number;
  idarea: number | null;
  idinvestigador: number | null;
  fechainicio: string | null;
  fechafin: string | null;
  activo: number | null;
  idarea_detail?: Areas;
  idinvestigador_detail?: Investigadores;
}

export interface Proyectos {
  idproyecto: number;
  nombre: string | null;
  idlider: number | null;
  estado: string | null;
  explicacion: string | null;
  fechainicio: string | null;
  fechafin: string | null;
  activo: number | null;
  importeingresos: number | null;
  idlider_detail?: Investigadores;
}

export interface Usuario {
  idusuario: number;
  idinvestigador: number | null;
  contrasena: string | null;
  fechacreacion: string | null;
  ultimoacceso: string | null;
  intentoslogin: number | null;
  activo: number | null;
  idinvestigador_detail?: Investigadores;
}

// Relationship tables
export interface DetArticulos {
  idarticulo: number;
  idinvestigador: number;
  ordenautor: number | null;
}

export interface DetEventos {
  idevento: number;
  idinvestigador: number;
  idrolevento: number | null;
}

export interface DetHerramientas {
  idproyecto: number;
  idherramienta: number;
}

export interface DetLineas {
  idlinea: number;
  idinvestigador: number;
}

export interface DetProyectos {
  idproyecto: number;
  idinvestigador: number;
  ordenimportancia: number | null;
}

// Response types for API calls
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
