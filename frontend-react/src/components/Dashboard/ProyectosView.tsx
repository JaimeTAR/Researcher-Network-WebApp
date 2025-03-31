import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiX,
  BiCalendar,
  BiCheckCircle,
  BiInfoCircle,
} from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { Proyectos } from "../../utils/interfaces";
import { GiBanknote } from "react-icons/gi";
import { useCategories } from "../../hooks/useCategories";
import { request } from "../../services/api";

const fetchProyectos = async (): Promise<Proyectos[]> => {
  return request("get", "/proyectos/");
};

const postProyecto = async (data: Proyectos) => {
  return request("post", "/proyectos/", data);
};

const updateProyecto = async (data: Proyectos) => {
  return request("put", `/proyectos/${data.idproyecto}/`, data);
};

const deleteProyecto = async (id: number) => {
  return request("delete", `/proyectos/${id}/`);
};

const ProyectosView = () => {
  const { investigadores } = useCategories();
  const [proyectos, setProyectos] = useState<Proyectos[]>([]);
  const [filteredProyectos, setFilteredProyectos] = useState<Proyectos[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Proyectos>({
    idproyecto: 0,
    nombre: "",
    idlider: null,
    estado: "",
    explicacion: "",
    fechainicio: null,
    fechafin: null,
    activo: 1,
    importeingresos: null,
  });

  const getProyectos = async () => {
    const data = await fetchProyectos();
    setProyectos(data);
    setFilteredProyectos(data);
  };

  // Fetch proyectos on component mount
  useEffect(() => {
    getProyectos();
  }, []);

  // Filter proyectos based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = proyectos.filter(
        (proj) =>
          proj.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          proj.estado?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          proj.idlider_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredProyectos(filtered);
    } else {
      setFilteredProyectos(proyectos);
    }
  }, [searchQuery, proyectos]);

  // Handler for editing a proyecto
  const handleEdit = (proyecto: Proyectos) => {
    setIsEditing(proyecto.idproyecto);
    setEditForm(proyecto);
  };

  // Handler for adding a new proyecto
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idproyecto: Math.max(0, ...proyectos.map((p) => p.idproyecto)) + 1,
      nombre: "",
      idlider: null,
      estado: "",
      explicacion: "",
      fechainicio: null,
      fechafin: null,
      activo: 1,
      importeingresos: null,
    });
  };

  // Handler for removing a proyecto
  const handleRemove = (id: number) => {
    deleteProyecto(id).then(getProyectos);
  };

  // Handler for saving changes
  const handleSave = () => {
    if (isEditing) {
      setIsEditing(null);
      updateProyecto(editForm).then(getProyectos);
    } else if (isAdding) {
      setIsAdding(false);
      postProyecto(editForm).then(getProyectos);
    }
  };

  // Handler for canceling edit/add
  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
  };

  // Handler for form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setEditForm({
        ...editForm,
        [name]: target.checked ? 1 : 0,
      });
    } else if (type === "number") {
      setEditForm({
        ...editForm,
        [name]: value === "" ? null : Number(value),
      });
    } else {
      setEditForm({
        ...editForm,
        [name]: value === "" ? null : value,
      });
    }
  };

  // Helper to get status badge color
  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "terminado":
        return "bg-green-700 text-green-100";
      case "en proceso":
        return "bg-blue-700 text-blue-100";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  // Helper to get status icon
  const getStatusIcon = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "terminado":
        return <BiCheckCircle className="mr-1 h-4 w-4" />;
      case "en proceso":
        return <BiInfoCircle className="mr-1 h-4 w-4" />;
      default:
        return <BiInfoCircle className="mr-1 h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Gestión de Proyectos
        </h1>

        {/* Search and Add Bar */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <BiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pr-3 pl-10 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Proyecto
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding ? "Agregar Nuevo Proyecto" : "Editar Proyecto"}
              </h2>
              <button
                onClick={handleCancel}
                className="rounded-full p-1 hover:bg-gray-700"
              >
                <BiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={editForm.nombre || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Investigador Líder
                </label>
                <select
                  name="idlider"
                  value={editForm.idlider || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar líder</option>
                  {investigadores.map((investigador) => (
                    <option
                      key={investigador.idinvestigador}
                      value={investigador.idinvestigador}
                    >
                      {investigador.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Estado</label>
                <select
                  name="estado"
                  value={editForm.estado || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar estado</option>
                  <option value="En Proceso">En Progreso</option>
                  <option value="Terminado">Completado</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="fechainicio"
                  value={editForm.fechainicio || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  name="fechafin"
                  value={editForm.fechafin || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Importe de Ingresos
                </label>
                <input
                  type="number"
                  name="importeingresos"
                  value={editForm.importeingresos || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Explicación
                </label>
                <textarea
                  name="explicacion"
                  value={editForm.explicacion || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="activo"
                  name="activo"
                  checked={editForm.activo === 1}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      activo: e.target.checked ? 1 : 0,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="activo" className="text-sm font-medium">
                  Proyecto Activo
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="mr-2 rounded-md bg-gray-700 px-4 py-2 transition-colors hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center rounded-md bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
              >
                <BiSave className="mr-2 h-4 w-4" />
                Guardar
              </button>
            </div>
          </div>
        )}

        {/* Proyectos Card List - Long Format */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProyectos.length > 0 ? (
            filteredProyectos.map((proyecto) => (
              <div
                key={proyecto.idproyecto}
                className={`overflow-hidden rounded-lg border ${
                  proyecto.activo === 1
                    ? "border-gray-700"
                    : "border-gray-800 opacity-70"
                } bg-gray-800 transition-colors hover:border-orange-500`}
              >
                <div className="p-5">
                  <div className="mb-4 flex flex-col items-start justify-between sm:flex-row">
                    <div>
                      <div className="mb-2 flex items-center">
                        <h3 className="mr-3 text-xl font-semibold">
                          {proyecto.nombre}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            proyecto.estado,
                          )}`}
                        >
                          {getStatusIcon(proyecto.estado)}
                          {proyecto.estado}
                        </span>
                        {proyecto.activo === 0 && (
                          <span className="ml-2 inline-flex rounded-full bg-red-900 px-2 text-xs leading-5 font-semibold text-red-100">
                            Inactivo
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-400">
                        {proyecto.explicacion || "Sin descripción"}
                      </p>
                    </div>
                    <div className="mt-2 flex space-x-2 sm:mt-0">
                      <button
                        onClick={() => handleEdit(proyecto)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Editar"
                      >
                        <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={() => handleRemove(proyecto.idproyecto)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Eliminar"
                      >
                        <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex items-center text-sm">
                      <BsFillPersonFill className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Líder:</span>
                      <span className="ml-1 truncate">
                        {proyecto.idlider_detail?.nombre || "No asignado"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiCalendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Inicio:</span>
                      <span className="ml-1">
                        {proyecto.fechainicio
                          ? new Date(proyecto.fechainicio).toLocaleDateString()
                          : "No definido"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiCalendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Fin:</span>
                      <span className="ml-1">
                        {proyecto.fechafin
                          ? new Date(proyecto.fechafin).toLocaleDateString()
                          : "No definido"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-700 pt-3">
                    <div className="flex items-center text-sm">
                      <GiBanknote className="mr-2 h-5 w-5 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Presupuesto:</span>
                      <span className="ml-1 text-green-400">
                        {proyecto.importeingresos
                          ? `$${proyecto.importeingresos.toLocaleString()}`
                          : "No especificado"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-gray-800 py-12 text-center">
              <div className="mx-auto flex items-center justify-center">
                <BiSearch className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-400">
                No se encontraron proyectos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega un nuevo proyecto.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar proyecto
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProyectosView;
