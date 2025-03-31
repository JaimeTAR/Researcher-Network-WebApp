import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiX,
  BiCalendar,
  BiLinkAlt,
  BiBookOpen,
  BiWorld,
} from "react-icons/bi";
import { FiBookmark } from "react-icons/fi";
import { Articulos } from "../../utils/interfaces";
import { request } from "../../services/api";

const fetchArticulos = async (): Promise<Articulos[]> => {
  return request("get", "/articulos/");
};

const postArticulo = async (data: Articulos) => {
  return request("post", "/articulos/", data);
};

const updateArticulo = async (data: Articulos) => {
  return request("put", `/articulos/${data.idarticulo}/`, data);
};

const deleteArticulo = async (id: number) => {
  return request("delete", `/articulos/${id}/`);
};

const ArticulosView = () => {
  const [articulos, setArticulos] = useState<Articulos[]>([]);
  const [filteredArticulos, setFilteredArticulos] = useState<Articulos[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Articulos>({
    idarticulo: 0,
    nombrearticulo: "",
    nombrerevista: "",
    abstracto: "",
    paispublicacion: "",
    anopublicacion: null,
    fechapublicacion: null,
    doi: "",
    url: "",
    estatus: 1, // Default to active
  });

  const getArticulos = async () => {
    const data = await fetchArticulos();
    setArticulos(data);
    setFilteredArticulos(data);
  };

  // Fetch articulos on component mount
  useEffect(() => {
    getArticulos();
  }, []);

  // Filter articulos based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = articulos.filter(
        (articulo) =>
          articulo.nombrearticulo
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          articulo.nombrerevista
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          articulo.paispublicacion
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          articulo.doi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (articulo.anopublicacion?.toString() || "").includes(searchQuery),
      );
      setFilteredArticulos(filtered);
    } else {
      setFilteredArticulos(articulos);
    }
  }, [searchQuery, articulos]);

  // Handler for editing an articulo
  const handleEdit = (articulo: Articulos) => {
    setIsEditing(articulo.idarticulo);
    setEditForm(articulo);
  };

  // Handler for adding a new articulo
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idarticulo: Math.max(0, ...articulos.map((a) => a.idarticulo)) + 1,
      nombrearticulo: "",
      nombrerevista: "",
      abstracto: "",
      paispublicacion: "",
      anopublicacion: null,
      fechapublicacion: null,
      doi: "",
      url: "",
      estatus: 1,
    });
  };

  // Handler for removing an articulo
  const handleRemove = (id: number) => {
    deleteArticulo(id).then(getArticulos);
  };

  // Handler for saving changes
  const handleSave = () => {
    if (isEditing) {
      setIsEditing(null);
      updateArticulo(editForm).then(getArticulos);
    } else if (isAdding) {
      setIsAdding(false);
      postArticulo(editForm).then(getArticulos);
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

  // Format full date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No definido";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Gestión de Artículos Científicos
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
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Artículo
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding ? "Agregar Nuevo Artículo" : "Editar Artículo"}
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
                  Nombre del Artículo
                </label>
                <input
                  type="text"
                  name="nombrearticulo"
                  value={editForm.nombrearticulo || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Revista
                </label>
                <input
                  type="text"
                  name="nombrerevista"
                  value={editForm.nombrerevista || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Año de Publicación
                </label>
                <input
                  type="number"
                  name="anopublicacion"
                  value={editForm.anopublicacion || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Fecha de Publicación
                </label>
                <input
                  type="date"
                  name="fechapublicacion"
                  value={editForm.fechapublicacion || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  País de Publicación
                </label>
                <input
                  type="text"
                  name="paispublicacion"
                  value={editForm.paispublicacion || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="estatus"
                  name="estatus"
                  checked={editForm.estatus === 1}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      estatus: e.target.checked ? 1 : 0,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="estatus" className="text-sm font-medium">
                  Artículo Activo
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">DOI</label>
                <input
                  type="text"
                  name="doi"
                  value={editForm.doi || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="https://doi.org/10.xxxx/xxxxx"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">URL</label>
                <input
                  type="text"
                  name="url"
                  value={editForm.url || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="https://example.com/article"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Resumen
                </label>
                <textarea
                  name="abstracto"
                  value={editForm.abstracto || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                ></textarea>
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

        {/* Articulos Card List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredArticulos.length > 0 ? (
            filteredArticulos.map((articulo) => (
              <div
                key={articulo.idarticulo}
                className={`overflow-hidden rounded-lg border ${
                  articulo.estatus === 1
                    ? "border-gray-700"
                    : "border-gray-800 opacity-70"
                } bg-gray-800 transition-colors hover:border-orange-500`}
              >
                <div className="p-5">
                  <div className="mb-4 flex flex-col items-start justify-between sm:flex-row">
                    <div>
                      <div className="mb-2 flex items-center">
                        <h3 className="mr-3 text-xl font-semibold">
                          {articulo.nombrearticulo}
                        </h3>
                        {articulo.estatus === 0 && (
                          <span className="ml-2 inline-flex rounded-full bg-red-900 px-2 text-xs leading-5 font-semibold text-red-100">
                            Inactivo
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-400">
                        {articulo.abstracto || "Sin resumen disponible"}
                      </p>
                    </div>
                    <div className="mt-2 flex space-x-2 sm:mt-0">
                      <button
                        onClick={() => handleEdit(articulo)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Editar"
                      >
                        <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={() => handleRemove(articulo.idarticulo)}
                        className="rounded-full p-1 hover:bg-gray-700"
                        aria-label="Eliminar"
                      >
                        <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex items-center text-sm">
                      <BiBookOpen className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Revista:</span>
                      <span className="ml-1 truncate">
                        {articulo.nombrerevista || "No especificado"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiCalendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">Año:</span>
                      <span className="ml-1">
                        {articulo.anopublicacion || "No especificado"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BiWorld className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="font-medium">País:</span>
                      <span className="ml-1">
                        {articulo.paispublicacion || "No especificado"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-gray-700 pt-3">
                    {articulo.doi && (
                      <div className="mb-2 flex items-center text-sm">
                        <FiBookmark className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">DOI:</span>
                        <span className="ml-1 text-blue-400 hover:underline">
                          <a
                            href={
                              articulo.doi.startsWith("http")
                                ? articulo.doi
                                : `https://doi.org/${articulo.doi}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {articulo.doi}
                          </a>
                        </span>
                      </div>
                    )}
                    {articulo.url && (
                      <div className="flex items-center text-sm">
                        <BiLinkAlt className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">URL:</span>
                        <span className="ml-1 text-blue-400 hover:underline">
                          <a
                            href={articulo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {articulo.url}
                          </a>
                        </span>
                      </div>
                    )}
                    {articulo.fechapublicacion && (
                      <div className="mt-2 flex items-center text-sm">
                        <BiCalendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">
                          Fecha de publicación:
                        </span>
                        <span className="ml-1">
                          {formatDate(articulo.fechapublicacion)}
                        </span>
                      </div>
                    )}
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
                No se encontraron artículos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega un nuevo artículo.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar artículo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticulosView;
