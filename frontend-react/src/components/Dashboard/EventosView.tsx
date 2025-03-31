import React, { useState, useEffect } from "react";
import {
  BiEdit,
  BiPlus,
  BiSave,
  BiSearch,
  BiTrash,
  BiX,
  BiCalendar,
  BiMap,
  BiBuilding,
  BiInfoCircle,
} from "react-icons/bi";
import { Eventos } from "../../utils/interfaces";
import { useCategories } from "../../hooks/useCategories";
import { request } from "../../services/api";

const fetchEventos = async (): Promise<Eventos[]> => {
  return request("get", "/eventos/");
};

const postEvento = async (data: Eventos) => {
  return request("post", "/eventos/", data);
};

const updateEvento = async (data: Eventos) => {
  return request("put", `/eventos/${data.idevento}/`, data);
};

const deleteEvento = async (id: number) => {
  return request("delete", `/eventos/${id}/`);
};

const EventosView = () => {
  const { tiposEventos } = useCategories();
  const [eventos, setEventos] = useState<Eventos[]>([]);
  const [filteredEventos, setFilteredEventos] = useState<Eventos[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Eventos>({
    idevento: 0,
    idtipoevento: null,
    nombreevento: "",
    descripcion: "",
    fechainicio: null,
    fechafin: null,
    lugar: "",
    empresainvita: "",
  });

  const getEventos = async () => {
    const data = await fetchEventos();
    setEventos(data);
    setFilteredEventos(data);
  };

  // Fetch eventos on component mount
  useEffect(() => {
    getEventos();
  }, []);

  // Filter eventos based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = eventos.filter(
        (event) =>
          event.nombreevento
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          event.lugar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.empresainvita
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          event.idtipoevento_detail?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      setFilteredEventos(filtered);
    } else {
      setFilteredEventos(eventos);
    }
  }, [searchQuery, eventos]);

  // Handler for editing an evento
  const handleEdit = (evento: Eventos) => {
    setIsEditing(evento.idevento);
    setEditForm(evento);
  };

  // Handler for adding a new evento
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      idevento: Math.max(0, ...eventos.map((e) => e.idevento)) + 1,
      idtipoevento: null,
      nombreevento: "",
      descripcion: "",
      fechainicio: null,
      fechafin: null,
      lugar: "",
      empresainvita: "",
    });
  };

  // Handler for removing an evento
  const handleRemove = (id: number) => {
    deleteEvento(id).then(getEventos);
  };

  // Handler for saving changes
  const handleSave = () => {
    if (isEditing) {
      setIsEditing(null);
      updateEvento(editForm).then(getEventos);
    } else if (isAdding) {
      setIsAdding(false);
      postEvento(editForm).then(getEventos);
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

  // Helper function to format dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No definido";
    return new Date(dateString).toLocaleDateString();
  };

  // Helper to get event type badge color
  const getEventTypeColor = (tipoEventoId: number | null) => {
    if (!tipoEventoId) return "bg-gray-700 text-gray-100";

    // You can customize these based on your event types
    switch (tipoEventoId) {
      case 1: // Congresos
        return "bg-blue-700 text-blue-100";
      case 2: // Talleres
        return "bg-green-700 text-green-100";
      case 3: // Conferencias
        return "bg-purple-700 text-purple-100";
      case 4: // Diplomados
        return "bg-yellow-700 text-yellow-100";
      case 5: // Charlas
        return "bg-amber-700 text-amber-100";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  // Check if event is current, past or future
  const getEventStatus = (
    fechaInicio: string | null,
    fechaFin: string | null,
  ) => {
    if (!fechaInicio) return null;

    const today = new Date();
    const startDate = new Date(fechaInicio);
    const endDate = fechaFin ? new Date(fechaFin) : null;

    if (endDate && endDate < today) {
      return { text: "Finalizado", class: "bg-gray-700 text-gray-100" };
    } else if (startDate > today) {
      return { text: "Próximo", class: "bg-yellow-500 text-yellow-900" };
    } else {
      return { text: "En curso", class: "bg-green-700 text-green-100" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Gestión de Eventos
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
              placeholder="Buscar eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 transition-colors hover:bg-orange-700"
          >
            <BiPlus className="mr-2 h-5 w-5" />
            Agregar Evento
          </button>
        </div>

        {/* Form for Adding/Editing */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-orange-500">
                {isAdding ? "Agregar Nuevo Evento" : "Editar Evento"}
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
                  Nombre del Evento
                </label>
                <input
                  type="text"
                  name="nombreevento"
                  value={editForm.nombreevento || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Tipo de Evento
                </label>
                <select
                  name="idtipoevento"
                  value={editForm.idtipoevento || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Seleccionar tipo</option>
                  {tiposEventos.map((tipo) => (
                    <option key={tipo.idtipoevento} value={tipo.idtipoevento}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Empresa que Invita
                </label>
                <input
                  type="text"
                  name="empresainvita"
                  value={editForm.empresainvita || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
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
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Lugar</label>
                <input
                  type="text"
                  name="lugar"
                  value={editForm.lugar || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={editForm.descripcion || ""}
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

        {/* Eventos Card List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredEventos.length > 0 ? (
            filteredEventos.map((evento) => {
              const eventStatus = getEventStatus(
                evento.fechainicio,
                evento.fechafin,
              );

              return (
                <div
                  key={evento.idevento}
                  className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-colors hover:border-orange-500"
                >
                  <div className="p-5">
                    <div className="mb-4 flex flex-col items-start justify-between sm:flex-row">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center">
                          <h3 className="mr-3 text-xl font-semibold">
                            {evento.nombreevento}
                          </h3>
                          {evento.idtipoevento_detail && (
                            <span
                              className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEventTypeColor(
                                evento.idtipoevento,
                              )}`}
                            >
                              <BiInfoCircle className="mr-1 h-4 w-4" />
                              {evento.idtipoevento_detail.nombre}
                            </span>
                          )}
                          {eventStatus && (
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${eventStatus.class}`}
                            >
                              {eventStatus.text}
                            </span>
                          )}
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-400">
                          {evento.descripcion || "Sin descripción"}
                        </p>
                      </div>
                      <div className="mt-2 flex space-x-2 sm:mt-0">
                        <button
                          onClick={() => handleEdit(evento)}
                          className="rounded-full p-1 hover:bg-gray-700"
                          aria-label="Editar"
                        >
                          <BiEdit className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                        </button>
                        <button
                          onClick={() => handleRemove(evento.idevento)}
                          className="rounded-full p-1 hover:bg-gray-700"
                          aria-label="Eliminar"
                        >
                          <BiTrash className="h-5 w-5 text-gray-300 hover:text-orange-500" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex items-center text-sm">
                        <BiCalendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">Inicio:</span>
                        <span className="ml-1">
                          {formatDate(evento.fechainicio)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BiCalendar className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">Fin:</span>
                        <span className="ml-1">
                          {formatDate(evento.fechafin)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BiMap className="mr-2 h-4 w-4 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">Lugar:</span>
                        <span className="ml-1 truncate">
                          {evento.lugar || "No especificado"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 border-t border-gray-700 pt-3">
                      <div className="flex items-center text-sm">
                        <BiBuilding className="mr-2 h-5 w-5 flex-shrink-0 text-orange-500" />
                        <span className="font-medium">Empresa invitante:</span>
                        <span className="ml-1">
                          {evento.empresainvita || "No especificado"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-lg bg-gray-800 py-12 text-center">
              <div className="mx-auto flex items-center justify-center">
                <BiSearch className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-400">
                No se encontraron eventos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Intenta ajustar tu búsqueda o agrega un nuevo evento.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleAdd}
                  className="inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-orange-600"
                >
                  <BiPlus className="mr-2 h-5 w-5" />
                  Agregar evento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventosView;
