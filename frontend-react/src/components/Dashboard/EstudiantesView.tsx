import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiUser,
  BiX,
  BiCalendar,
} from "react-icons/bi";
import { Estudiantes } from "../../utils/interfaces";
import { GiBanknote } from "react-icons/gi";
import { useCategories } from "../../hooks/useCategories";
import { request } from "../../services/api";
import { FaGraduationCap } from "react-icons/fa";

const fetchEstudiantes = async (): Promise<Estudiantes[]> => {
  return request("get", "/estudiantes/");
};

const postEstudiante = async (data: Estudiantes) => {
  return request("post", "/estudiantes/", data);
};

const updateEstudiante = async (data: Estudiantes) => {
  return request("put", `/estudiantes/${data.idestudiante}/`, data);
};

const deleteEstudiante = async (id: number) => {
  return request("delete", `/estudiantes/${id}/`);
};

const EstudiantesView = () => {
  const { tiposEstudiantes, carreras, investigadores } = useCategories();
  const [estudiantes, setEstudiantes] = useState<Estudiantes[]>([]);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState<Estudiantes[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Estudiantes>({
    idestudiante: 0,
    idtipoestudiante: null,
    idcarreras: null,
    idinvestigador: null,
    nombre: "",
    fechainicio: null,
    fechatermino: null,
    sueldoestudiante: null,
  });

  const getEstudiantes = async () => {
    const data = await fetchEstudiantes();
    setEstudiantes(data);
    setFilteredEstudiantes(data);
  };

  // Fetch estudiantes on component mount
  useEffect(() => {
    getEstudiantes();
  }, []);

  // Filter estudiantes based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = estudiantes.filter(
        (est) =>
          est.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          est.idcarreras_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          est.idtipoestudiante_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          est.idinvestigador_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredEstudiantes(filtered);
    } else {
      setFilteredEstudiantes(estudiantes);
    }
  }, [searchQuery, estudiantes]);

  // Handler for editing an estudiante
  const handleEdit = (estudiante: Estudiantes) => {
    setIsEditing(estudiante.idestudiante);
    setEditForm(estudiante);
  };

  // Handler for adding a new estudiante
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idestudiante: Math.max(0, ...estudiantes.map((i) => i.idestudiante)) + 1,
      idtipoestudiante: null,
      idcarreras: null,
      idinvestigador: null,
      nombre: "",
      fechainicio: null,
      fechatermino: null,
      sueldoestudiante: null,
    });
  };

  // Handler for removing an estudiante
  const handleRemove = (id: number) => {
    deleteEstudiante(id).then(getEstudiantes);
  };

  // Handler for saving changes
  const handleSave = () => {
    if (isEditing) {
      setIsEditing(null);
      updateEstudiante(editForm).then(getEstudiantes);
    } else if (isAdding) {
      setIsAdding(false);
      postEstudiante(editForm).then(getEstudiantes);
    }
  };

  // Handler for canceling edit/add
  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
  };

  // Handler for form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "number") {
      setEditForm({
        ...editForm,
        [name]: value === "" ? null : Number(value),
      });
    } else if (type === "date") {
      setEditForm({
        ...editForm,
        [name]: value === "" ? null : value,
      });
    } else {
      setEditForm({
        ...editForm,
        [name]: value === "" ? null : value,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Gestión de Estudiantes
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
              placeholder="Buscar estudiantes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Estudiante
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding ? "Agregar Nuevo Estudiante" : "Editar Estudiante"}
              </h2>
              <button
                onClick={handleCancel}
                className="rounded-full p-1 hover:bg-gray-700"
              >
                <BiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Nombre</label>
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
                  Tipo de Estudiante
                </label>
                <select
                  name="idtipoestudiante"
                  value={editForm.idtipoestudiante || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar tipo</option>
                  {tiposEstudiantes.map((tipo) => (
                    <option
                      key={tipo.idtipoestudiante}
                      value={tipo.idtipoestudiante}
                    >
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Carrera
                </label>
                <select
                  name="idcarreras"
                  value={editForm.idcarreras || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar carrera</option>
                  {carreras.map((carrera) => (
                    <option key={carrera.idcarreras} value={carrera.idcarreras}>
                      {carrera.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Investigador
                </label>
                <select
                  name="idinvestigador"
                  value={editForm.idinvestigador || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar investigador</option>
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
                  Fecha de Término
                </label>
                <input
                  type="date"
                  name="fechatermino"
                  value={editForm.fechatermino || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Sueldo</label>
                <input
                  type="number"
                  name="sueldoestudiante"
                  value={editForm.sueldoestudiante || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
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

        {/* Estudiantes Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEstudiantes.length > 0 ? (
            filteredEstudiantes.map((estudiante) => (
              <div
                key={estudiante.idestudiante}
                className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-colors hover:border-orange-500"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-700 text-lg font-bold">
                        {estudiante.nombre ? estudiante.nombre.charAt(0) : "?"}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">
                            {estudiante.nombre}
                          </h3>
                        </div>
                        <p className="text-orange-500">
                          {estudiante.idtipoestudiante_detail?.nombre}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(estudiante)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Editar"
                      >
                        <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={() => handleRemove(estudiante.idestudiante)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Eliminar"
                      >
                        <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <FaGraduationCap className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {estudiante.idcarreras_detail?.nombre ||
                          "No especificado"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiUser className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {estudiante.idinvestigador_detail?.nombre ||
                          "Sin investigador"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiCalendar className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {estudiante.fechainicio
                          ? `Inicio: ${new Date(estudiante.fechainicio).toLocaleDateString()}`
                          : "Fecha inicio no especificada"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiCalendar className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {estudiante.fechatermino
                          ? `Término: ${new Date(estudiante.fechatermino).toLocaleDateString()}`
                          : "Fecha término no especificada"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GiBanknote className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {estudiante.sueldoestudiante
                          ? `$${estudiante.sueldoestudiante.toLocaleString()}`
                          : "Sueldo no especificado"}
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
                No se encontraron estudiantes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega un nuevo estudiante.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar estudiante
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstudiantesView;
