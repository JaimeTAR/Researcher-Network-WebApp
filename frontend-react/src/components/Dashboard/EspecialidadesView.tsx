import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiX,
  BiBookContent,
} from "react-icons/bi";
import { Especialidad } from "../../utils/interfaces";
import { request } from "../../services/api";

const fetchEspecialidades = async (): Promise<Especialidad[]> => {
  return request("get", "/especialidad/");
};

const postEspecialidad = async (data: Especialidad) => {
  return request("post", "/especialidad/", data);
};

const updateEspecialidad = async (data: Especialidad) => {
  return request("put", `/especialidad/${data.idespecialidad}/`, data);
};

const deleteEspecialidad = async (id: number) => {
  return request("delete", `/especialidad/${id}/`);
};

const EspecialidadesView = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [filteredEspecialidades, setFilteredEspecialidades] = useState<
    Especialidad[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Especialidad>({
    idespecialidad: 0,
    nombreespecialidad: "",
  });

  const getEspecialidades = async () => {
    const data = await fetchEspecialidades();
    setEspecialidades(data);
    setFilteredEspecialidades(data);
  };

  // Fetch especialidades on component mount
  useEffect(() => {
    getEspecialidades();
  }, []);

  // Filter especialidades based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = especialidades.filter((esp) =>
        esp.nombreespecialidad
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );
      setFilteredEspecialidades(filtered);
    } else {
      setFilteredEspecialidades(especialidades);
    }
  }, [searchQuery, especialidades]);

  // Handler for editing an especialidad
  const handleEdit = (especialidad: Especialidad) => {
    setIsEditing(especialidad.idespecialidad);
    setEditForm(especialidad);
  };

  // Handler for adding a new especialidad
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idespecialidad:
        Math.max(0, ...especialidades.map((e) => e.idespecialidad)) + 1,
      nombreespecialidad: "",
    });
  };

  // Handler for removing an especialidad
  const handleRemove = (id: number) => {
    deleteEspecialidad(id).then(getEspecialidades);
  };

  // Handler for saving changes
  const handleSave = () => {
    if (isEditing) {
      setIsEditing(null);
      updateEspecialidad(editForm).then(getEspecialidades);
    } else if (isAdding) {
      setIsAdding(false);
      postEspecialidad(editForm).then(getEspecialidades);
    }
  };

  // Handler for canceling edit/add
  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
  };

  // Handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Function to generate a random color for the card accent
  const getRandomAccentColor = (id: number) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-teal-500",
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Gestión de Especialidades
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
              placeholder="Buscar especialidades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Especialidad
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding
                  ? "Agregar Nueva Especialidad"
                  : "Editar Especialidad"}
              </h2>
              <button
                onClick={handleCancel}
                className="rounded-full p-1 hover:bg-gray-700"
              >
                <BiX className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Nombre de la Especialidad
              </label>
              <input
                type="text"
                name="nombreespecialidad"
                value={editForm.nombreespecialidad || ""}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
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

        {/* Especialidades Card Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredEspecialidades.length > 0 ? (
            filteredEspecialidades.map((especialidad) => (
              <div
                key={especialidad.idespecialidad}
                className="group overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div
                  className={`h-2 ${getRandomAccentColor(especialidad.idespecialidad)}`}
                ></div>
                <div className="py-4">
                  <div className="relative flex items-center justify-between px-4">
                    <div className="flex items-center">
                      <BiBookContent className="mr-2 h-5 w-5 text-orange-500" />
                      <h3 className="truncate text-lg font-semibold">
                        {especialidad.nombreespecialidad || "Sin nombre"}
                      </h3>
                    </div>
                    <div className="absolute right-0 flex space-x-1 bg-gray-800 pr-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <button
                        onClick={() => handleEdit(especialidad)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Editar"
                      >
                        <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={() =>
                          handleRemove(especialidad.idespecialidad)
                        }
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Eliminar"
                      >
                        <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
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
                No se encontraron especialidades
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega una nueva especialidad.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar especialidad
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EspecialidadesView;
