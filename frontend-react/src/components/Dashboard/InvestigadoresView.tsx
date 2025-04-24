import React, { useState, useEffect } from "react";
import {
  BiBookOpen,
  BiEdit,
  BiPhone,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiUser,
  BiX,
} from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { Investigadores } from "../../utils/interfaces";
import { GiBanknote } from "react-icons/gi";
import { useCategories } from "../../hooks/useCategories";
import { request } from "../../services/api";
import { useNavigate } from "react-router";

const fetchInvestigadores = async (): Promise<Investigadores[]> => {
  return request("get", "/investigadores/");
};

const postInvestigador = async (data: Investigadores) => {
  return request("post", "/investigadores/", data);
};

const updateInvestigador = async (data: Investigadores) => {
  return request("put", `/investigadores/${data.idinvestigador}/`, data);
};

const deleteInvestigador = async (id: number) => {
  return request("delete", `/investigadores/${id}/`);
};

const InvestigadoresView = () => {
  const navigate = useNavigate();
  const {
    nivelesEdu: niveles,
    areas,
    nivelesSnii: sniiLevels,
  } = useCategories();
  const [investigadores, setInvestigadores] = useState<Investigadores[]>([]);
  const [filteredInvestigadores, setFilteredInvestigadores] = useState<
    Investigadores[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Investigadores>({
    idinvestigador: 0,
    idarea: null,
    idniveledu: null,
    idsnii: null,
    nombre: "",
    correo: "",
    celular: "",
    activo: 1,
    sueldoinvestigador: null,
  });

  const getInvestigadores = async () => {
    const data = await fetchInvestigadores();
    setInvestigadores(data);
    setFilteredInvestigadores(data);
  };

  // Fetch investigadores on component mount
  useEffect(() => {
    getInvestigadores();
  }, []);

  // Filter investigadores based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = investigadores.filter(
        (inv) =>
          inv.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inv.correo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inv.idarea_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredInvestigadores(filtered);
    } else {
      setFilteredInvestigadores(investigadores);
    }
  }, [searchQuery, investigadores]);

  // Handler for editing an investigador
  const handleEdit = (investigador: Investigadores) => {
    setIsEditing(investigador.idinvestigador);
    setEditForm(investigador);
  };

  // Handler for adding a new investigador
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idinvestigador:
        Math.max(0, ...investigadores.map((i) => i.idinvestigador)) + 1,
      idarea: null,
      idniveledu: null,
      idsnii: null,
      nombre: "",
      correo: "",
      celular: "",
      activo: 1,
      sueldoinvestigador: null,
    });
  };

  // Handler for removing an investigador
  const handleRemove = (id: number) => {
    deleteInvestigador(id).then(getInvestigadores);
  };

  // Handler for saving changes
  const handleSave = () => {
    // Find the related details for selected IDs
    if (isEditing) {
      setIsEditing(null);
      updateInvestigador(editForm).then(getInvestigadores);
    } else if (isAdding) {
      setIsAdding(false);
      postInvestigador(editForm).then(getInvestigadores);
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

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Gestión de Investigadores
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
              placeholder="Buscar investigadores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Investigador
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding
                  ? "Agregar Nuevo Investigador"
                  : "Editar Investigador"}
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
                <label className="mb-1 block text-sm font-medium">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={editForm.correo || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Celular
                </label>
                <input
                  type="text"
                  name="celular"
                  value={editForm.celular || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Área</label>
                <select
                  name="idarea"
                  value={editForm.idarea || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar área</option>
                  {areas.map((area) => (
                    <option key={area.idarea} value={area.idarea}>
                      {area.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Nivel Educativo
                </label>
                <select
                  name="idniveledu"
                  value={editForm.idniveledu || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar nivel</option>
                  {niveles.map((nivel) => (
                    <option key={nivel.idniveledu} value={nivel.idniveledu}>
                      {nivel.idespecialidad_detail?.nombreespecialidad}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Nivel SNII
                </label>
                <select
                  name="idsnii"
                  value={editForm.idsnii || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar SNII</option>
                  {sniiLevels.map((snii) => (
                    <option key={snii.idnivelsnii} value={snii.idnivelsnii}>
                      {snii.nivel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Sueldo</label>
                <input
                  type="number"
                  name="sueldoinvestigador"
                  value={editForm.sueldoinvestigador || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="mt-6 flex items-center space-x-2">
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
                  Activo
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

        {/* Investigadores Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvestigadores.length > 0 ? (
            filteredInvestigadores.map((investigador) => (
              <div
                key={investigador.idinvestigador}
                onClick={() => {
                  navigate("/investigador/" + investigador.idinvestigador);
                }}
                className="cursor-pointer overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-colors hover:border-orange-500"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div
                        className={`h-12 w-12 rounded-full ${investigador.activo === 1 ? "bg-orange-700" : "bg-gray-600"} flex items-center justify-center text-lg font-bold`}
                      >
                        {investigador.nombre
                          ? investigador.nombre.charAt(0)
                          : "?"}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">
                            {investigador.nombre}
                          </h3>
                          {investigador.activo === 1 ? (
                            <span className="ml-2 inline-flex rounded-full bg-green-700 px-2 text-xs leading-5 font-semibold text-green-100">
                              Activo
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex rounded-full bg-red-900 px-2 text-xs leading-5 font-semibold text-red-100">
                              Inactivo
                            </span>
                          )}
                        </div>
                        <p className="text-orange-500">
                          {investigador.idarea_detail?.nombre}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(investigador)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Editar"
                      >
                        <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={() =>
                          handleRemove(investigador.idinvestigador)
                        }
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Eliminar"
                      >
                        <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <BsMailbox className="mr-2 h-4 w-4 text-orange-500" />
                      <span>{investigador.correo || "No disponible"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiPhone className="mr-2 h-4 w-4 text-orange-500" />
                      <span>{investigador.celular || "No disponible"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiBookOpen className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {investigador.idarea_detail?.nombre ||
                          "No especificado"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiUser className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        SNII:{" "}
                        {investigador.idsnii_detail?.idnivelsnii_detail
                          ?.nivel || "No especificado"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GiBanknote className="mr-2 h-4 w-4 text-orange-500" />
                      <span>
                        {investigador.sueldoinvestigador
                          ? `$${investigador.sueldoinvestigador.toLocaleString()}`
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
                No se encontraron investigadores
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega un nuevo investigador.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar investigador
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestigadoresView;
