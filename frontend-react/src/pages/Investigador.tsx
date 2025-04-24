import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
  BiAward,
  BiBook,
  BiBuilding,
  BiCalendar,
  BiUser,
} from "react-icons/bi";
import { FaFlask, FaGraduationCap } from "react-icons/fa";
import { GiLightBulb } from "react-icons/gi";
import { request } from "../services/api";
import {
  Articulos,
  DetArticulos,
  DetEventos,
  DetLineas,
  DetProyectos,
  Estudiantes,
  Eventos,
  Investigadores,
  Lineas,
  Proyectos,
} from "../utils/interfaces";
import axios from "axios";

const fetchInvestigador = async (id: number): Promise<Investigadores> => {
  return request("get", "/investigadores/" + id + "/");
};

const fetchLineas = async (id: number): Promise<String[]> => {
  try {
    const data = await request("get", "/detlineas/");
    const filtrados = data.filter(
      (item: DetLineas) => item.idinvestigador === id,
    );

    const lineasPromises = filtrados.map((item: DetLineas) =>
      axios
        .get<Lineas>(`http://localhost:8000/api/lineas/${item.idlinea}/`)
        .then((res) => res.data.nombre),
    );

    const lineas = await Promise.all(lineasPromises);
    return lineas;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchArticulos = async (id: number): Promise<Articulos[]> => {
  try {
    const data = await request("get", "/detarticulos/");
    const filtrados = data.filter(
      (item: DetArticulos) => item.idinvestigador === id,
    );

    const articulosPromises = filtrados.map((item: DetArticulos) =>
      axios
        .get<Articulos>(
          `http://localhost:8000/api/articulos/${item.idarticulo}/`,
        )
        .then((res) => res.data),
    );

    const articulos = await Promise.all(articulosPromises);
    return articulos;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchProyectos = async (id: number): Promise<Proyectos[]> => {
  try {
    const data = await request("get", "/detproyectos/");
    const filtrados = data.filter(
      (item: DetProyectos) => item.idinvestigador === id,
    );

    const proyectosPromises = filtrados.map((item: DetProyectos) =>
      axios
        .get<Proyectos>(
          `http://localhost:8000/api/proyectos/${item.idproyecto}/`,
        )
        .then((res) => res.data),
    );

    const proyectos = await Promise.all(proyectosPromises);
    return proyectos;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchEstudiantes = async (id: number): Promise<Estudiantes[]> => {
  try {
    const data = await request("get", "/estudiantes/").then((data) =>
      data.filter((item: Estudiantes) => item.idinvestigador === id),
    );

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

type EventoConRol = Eventos & { idrolevento: number };

const fetchEventos = async (id: number): Promise<EventoConRol[]> => {
  try {
    const data = await request("get", "/deteventos/");
    const filtrados = data.filter(
      (item: DetEventos) =>
        item.idinvestigador === id && item.idrolevento === 1,
    );

    const eventosPromises = filtrados.map(async (item: DetEventos) => {
      const res = await axios.get<Eventos>(
        `http://localhost:8000/api/eventos/${item.idevento}/`,
      );
      return {
        ...res.data,
        idrolevento: item.idrolevento,
      };
    });

    const eventosConRol = await Promise.all(eventosPromises);
    return eventosConRol;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

interface TabType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Investigador = () => {
  const { investigadorId } = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [investigador, setInvestigador] = useState<Investigadores>();
  const [lineas, setLineas] = useState<String[]>();
  const [articulos, setArticulos] = useState<Articulos[]>();
  const [proyectos, setProyectos] = useState<Proyectos[]>();
  const [estudiantes, setEstudiantes] = useState<Estudiantes[]>();
  const [eventos, setEventos] = useState<EventoConRol[]>();

  const getData = async () => {
    if (investigadorId) {
      const data = await fetchInvestigador(Number(investigadorId));
      setInvestigador(data);
      const lineasData = await fetchLineas(Number(investigadorId));
      setLineas(lineasData);
      const articulosData = await fetchArticulos(Number(investigadorId));
      setArticulos(articulosData);
      const proyectosData = await fetchProyectos(Number(investigadorId));
      setProyectos(proyectosData);
      const estudiantesData = await fetchEstudiantes(Number(investigadorId));
      setEstudiantes(estudiantesData);
      const eventosData = await fetchEventos(Number(investigadorId));
      setEventos(eventosData);
    }
  };

  // Fetch investigadores on component mount
  useEffect(() => {
    getData();
  }, []);

  // Define tabs
  const tabs: TabType[] = [
    {
      id: "general",
      label: "Información General",
      icon: <BiUser className="h-5 w-5" />,
    },
    {
      id: "articulos",
      label: "Artículos",
      icon: <BiBook className="h-5 w-5" />,
    },
    {
      id: "proyectos",
      label: "Proyectos",
      icon: <FaFlask className="h-5 w-5" />,
    },
    {
      id: "lineas",
      label: "Líneas de Investigación",
      icon: <GiLightBulb className="h-5 w-5" />,
    },
    {
      id: "estudiantes",
      label: "Estudiantes",
      icon: <BiUser className="h-5 w-5" />,
    },
    {
      id: "eventos",
      label: "Eventos",
      icon: <BiCalendar className="h-5 w-5" />,
    },
    {
      id: "info",
      label: "SNII y Área",
      icon: <BiBuilding className="h-5 w-5" />,
    },
  ];
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="grow bg-gray-900 p-6 text-gray-100">
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-8 flex flex-col items-center gap-6 rounded-lg border border-gray-700 bg-gray-800 p-6 md:flex-row">
              <div>
                <BiUser className="aspect-square h-full w-24 rounded-lg border-2 border-orange-500 object-cover text-orange-600" />
              </div>
              <div>
                <h1 className="-mt-2 text-6xl font-bold text-orange-500">
                  {investigador?.nombre}
                </h1>
                <h3 className="text-lg">
                  {
                    investigador?.idniveledu_detail?.idespecialidad_detail
                      ?.nombreespecialidad
                  }
                </h3>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex min-w-max gap-1 border-b border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-b-2 border-orange-500 text-orange-500"
                        : "text-gray-400 hover:text-orange-300"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
              {activeTab === "general" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-orange-500">
                    Información General
                  </h2>
                  <div className="space-y-4">
                    <p>
                      <span className="text-orange-400">Correo:</span>{" "}
                      {investigador?.correo}
                    </p>
                    <p>
                      <span className="text-orange-400">Teléfono:</span>{" "}
                      {investigador?.celular}
                    </p>
                    <p>
                      <span className="text-orange-400">Sueldo:</span> $
                      {investigador?.sueldoinvestigador}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "articulos" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-orange-500">
                    Artículos Publicados
                  </h2>
                  <div className="space-y-6">
                    {articulos?.map((articulo, index) => {
                      return (
                        <div key={index} className="rounded-lg bg-gray-900 p-4">
                          <h3 className="text-lg font-semibold text-orange-400">
                            {articulo.nombrearticulo}
                          </h3>
                          <p>
                            <span className="text-gray-400">País: </span>
                            {articulo.paispublicacion}
                          </p>
                          <p>
                            <span className="text-gray-400">DOI: </span>
                            {articulo.doi}
                          </p>
                          <p>
                            <span className="text-gray-400">
                              Fecha de publicación:{" "}
                            </span>
                            {articulo.fechapublicacion}
                          </p>
                          <p>
                            <span className="text-gray-400">Revista: </span>
                            {articulo.nombrerevista}
                          </p>
                          <p>
                            <span className="text-gray-400">URL: </span>
                            <span className="underline">
                              <a href={articulo.url!}>{articulo.url}</a>
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "proyectos" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-orange-500">
                    Proyectos de Investigación
                  </h2>
                  <div className="space-y-6">
                    {proyectos?.map((proyecto, index) => (
                      <div key={index} className="rounded-lg bg-gray-900 p-4">
                        <h3 className="mb-2 text-xl font-semibold text-orange-400">
                          {proyecto.nombre}
                        </h3>
                        <p>{proyecto.explicacion}</p>
                        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                          <p>
                            <span className="text-gray-400">Ingresos: </span>$
                            {proyecto.importeingresos}
                          </p>

                          <p>
                            <span className="text-gray-400">Inicio: </span>
                            {proyecto.fechainicio}
                            <span className="ml-4 text-gray-400">Fin: </span>
                            {proyecto.fechafin}
                          </p>
                          <p>
                            <span className="text-gray-400">Estado:</span>
                            <span
                              className={
                                proyecto.estado === "En proceso"
                                  ? "ml-1 text-green-500"
                                  : "ml-1 text-blue-500"
                              }
                            >
                              {proyecto.estado}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "lineas" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-orange-500">
                    Líneas de Investigación
                  </h2>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {lineas?.map((linea, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-lg bg-gray-900 p-4"
                      >
                        <GiLightBulb className="mr-3 h-6 w-6 text-orange-500" />
                        <span>{linea}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "estudiantes" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-orange-500">
                    Estudiantes
                  </h2>
                  <div className="space-y-6">
                    {estudiantes?.map((estudiante, index) => (
                      <div key={index} className="rounded-lg bg-gray-900 p-4">
                        <p className="text-sm">
                          {estudiante.idtipoestudiante_detail?.nombre}
                        </p>
                        <h3 className="text-2xl font-semibold text-orange-400">
                          {estudiante.nombre}
                        </h3>
                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
                          <p>
                            <span className="text-gray-400">Colegio: </span>
                            {estudiante.idcarreras_detail?.escuela}
                          </p>
                          <p>
                            <span className="text-gray-400">Carrera: </span>
                            {estudiante.idcarreras_detail?.nombre}
                          </p>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
                          <p>
                            <span className="text-gray-400">
                              Fecha inicio:{" "}
                            </span>
                            {estudiante.fechainicio}
                          </p>
                          <p>
                            <span className="text-gray-400">
                              Fecha termino:{" "}
                            </span>
                            {estudiante.fechatermino}
                          </p>
                        </div>
                        <p className="mt-2">
                          <span className="text-gray-400">Sueldo: </span>$
                          {estudiante.sueldoestudiante}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "eventos" && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-orange-500">
                    Eventos
                  </h2>
                  <div className="space-y-4">
                    {eventos?.map((evento, index) => (
                      <div key={index} className="rounded-lg bg-gray-900 p-4">
                        <h3 className="text-lg font-semibold text-orange-400">
                          {evento.nombreevento} - By {evento.empresainvita}
                        </h3>
                        <p className="mt-2">{evento.descripcion}</p>
                        <p className="mt-2">
                          <span className="text-gray-400">Tipo: </span>
                          {evento.idtipoevento_detail?.nombre}
                        </p>
                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
                          <p>
                            <span className="text-gray-400">Rol: </span>
                            {evento.idrolevento === 1 ? "Ponente" : "Invitado"}
                          </p>
                          <p>
                            <span className="text-gray-400">Lugar: </span>
                            {evento.lugar}
                          </p>
                          <p>
                            <span className="text-gray-400">Fecha: </span>
                            {evento.fechainicio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "info" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-orange-500">
                      Sistema Nacional de Investigadores
                    </h2>
                    <div className="rounded-lg bg-gray-900 p-4">
                      <div className="mb-3 flex items-center">
                        <BiAward className="mr-3 h-8 w-8 text-orange-500" />
                        <span className="text-xl font-semibold">
                          {
                            investigador?.idsnii_detail?.idnivelsnii_detail
                              ?.nivel
                          }
                        </span>
                      </div>
                      <p>
                        <span className="text-gray-400">
                          Fecha de asignación:
                        </span>{" "}
                        {investigador?.idsnii_detail?.fechaasignacion}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-orange-500">
                      Área Académica
                    </h2>
                    <div className="rounded-lg bg-gray-900 p-4">
                      <p className="mb-2">
                        <span className="text-gray-400">Área:</span>{" "}
                        {investigador?.idarea_detail?.nombre}
                      </p>
                      <p className="mb-2">
                        <span className="text-gray-400">Unidad:</span>{" "}
                        {investigador?.idarea_detail?.idunidad_detail?.nombre}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Investigador;
