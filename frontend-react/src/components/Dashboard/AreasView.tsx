import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiX,
  BiBuilding,
  BiGridAlt,
} from "react-icons/bi";
import { Areas } from "../../utils/interfaces";
import { useCategories } from "../../hooks/useCategories";
import { request } from "../../services/api";

const fetchAreas = async (): Promise<Areas[]> => {
  return request("get", "/areas/");
};

const postArea = async (data: Areas) => {
  return request("post", "/areas/", data);
};

const updateArea = async (data: Areas) => {
  return request("put", `/areas/${data.idarea}/`, data);
};

const deleteArea = async (id: number) => {
  return request("delete", `/areas/${id}/`);
};

const AreasView = () => {
  const { unidades } = useCategories();
  const [areas, setAreas] = useState<Areas[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<Areas[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Areas>({
    idarea: 0,
    idunidad: null,
    nombre: "",
  });

  const getAreas = async () => {
    const data = await fetchAreas();
    setAreas(data);
    setFilteredAreas(data);
  };

  // Fetch areas on component mount
  useEffect(() => {
    getAreas();
  }, []);

  // Filter areas based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = areas.filter(
        (area) =>
          area.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          area.idunidad_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas(areas);
    }
  }, [searchQuery, areas]);

  // Handler for editing an area
  const handleEdit = (area: Areas) => {
    setIsEditing(area.idarea);
    setEditForm(area);
  };

  // Handler for adding a new area
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idarea: Math.max(0, ...areas.map((a) => a.idarea)) + 1,
      idunidad: null,
      nombre: "",
    });
  };

  // Handler for removing an area
  const handleRemove = (id: number) => {
    deleteArea(id).then(getAreas);
  };

  // Handler for saving changes
  const handleSave = () => {
    if (isEditing) {
      setIsEditing(null);
      updateArea(editForm).then(getAreas);
    } else if (isAdding) {
      setIsAdding(false);
      postArea(editForm).then(getAreas);
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
          Gestión de Áreas
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
              placeholder="Buscar áreas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Área
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding ? "Agregar Nueva Área" : "Editar Área"}
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
                <label className="mb-1 block text-sm font-medium">
                  Nombre del Área
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
                <label className="mb-1 block text-sm font-medium">Unidad</label>
                <select
                  name="idunidad"
                  value={editForm.idunidad || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar unidad</option>
                  {unidades?.map((unidad) => (
                    <option key={unidad.idunidad} value={unidad.idunidad}>
                      {unidad.nombre}
                    </option>
                  ))}
                </select>
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

        {/* Areas Card Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area) => (
              <div
                key={area.idarea}
                className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-colors hover:border-orange-500"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <BiGridAlt className="mr-2 h-5 w-5 text-orange-500" />
                        <h3 className="truncate text-lg font-semibold">
                          {area.nombre || "Sin nombre"}
                        </h3>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(area)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Editar"
                      >
                        <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={() => handleRemove(area.idarea)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Eliminar"
                      >
                        <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-center text-sm">
                      <BiBuilding className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Unidad:</span>
                      <span className="ml-1 truncate">
                        {area.idunidad_detail?.nombre || "No asignado"}
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
                No se encontraron áreas
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega una nueva área.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar área
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreasView;
