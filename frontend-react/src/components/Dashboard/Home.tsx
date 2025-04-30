import { useState, ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import { request } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface UploadStatusType {
  success: boolean;
  message: string;
}

interface PointsResponse {
  investigadores: Points[];
}
interface Points {
  IdInvestigador: Number;
  Area: String;
  Investigador: String;
  PuntosEstudiantes: Number;
  PuntosLineasReconocidas: Number;
  PuntosProyectos: Number;
  PuntosArticulos: Number;
  PuntosEventos: Number;
  PuntajeTotal: Number;
}

// Colors for the pie chart
const COLORS = ["#FF8C42", "#FFB236", "#FFD97D", "#A5DD9B", "#66C3FF"];

const fetchPoints = async (): Promise<PointsResponse> => {
  return request("get", "/investigator-values/");
};

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatusType | null>(
    null,
  );
  const [puntos, setPuntos] = useState<Points[]>([]);

  // State for the modal and selected investigator
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedInvestigator, setSelectedInvestigator] =
    useState<Points | null>(null);

  // Get unique areas for the filter
  const allAreas = useMemo(() => {
    if (puntos.length === 0) return ["Todos"];
    const areas = [...new Set(puntos.map((inv) => inv.Area))];
    return ["Todos", ...areas.sort()];
  }, [puntos]);

  // State for the selected area filter
  const [selectedArea, setSelectedArea] = useState("Todos");

  // Filter and sort data based on selected area
  const filteredData = useMemo(() => {
    let filtered = [...puntos];

    if (selectedArea !== "Todos") {
      filtered = filtered.filter((inv) => inv.Area === selectedArea);
    }

    return filtered.sort(
      (a, b) => Number(b.PuntajeTotal) - Number(a.PuntajeTotal),
    );
  }, [selectedArea, puntos]);

  // Function to generate pie chart data from selected investigator
  const getPieData = (investigator: Points) => {
    return [
      { name: "Estudiantes", value: Number(investigator.PuntosEstudiantes) },
      {
        name: "Líneas Reconocidas",
        value: Number(investigator.PuntosLineasReconocidas),
      },
      { name: "Proyectos", value: Number(investigator.PuntosProyectos) },
      { name: "Artículos", value: Number(investigator.PuntosArticulos) },
      { name: "Eventos", value: Number(investigator.PuntosEventos) },
    ].filter((item) => item.value > 0); // Only include points greater than 0
  };

  const getPoints = async () => {
    const data = await fetchPoints();
    setPuntos(data.investigadores);
  };

  // Fetch investigadores on component mount
  useEffect(() => {
    getPoints();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus({
        success: false,
        message: "Please select a file first.",
      });
      return;
    }

    if (!file.name.endsWith(".sql")) {
      setUploadStatus({
        success: false,
        message: "Only .sql files are accepted.",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("dump_file", file);

      // Replace with your actual endpoint
      const response = await request("post", "/dump", formData);

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: "Dump restored successfully!",
        });
        setFile(null);
      } else {
        const errorData = await response.json();
        setUploadStatus({
          success: false,
          message: errorData.message || "Upload failed.",
        });
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: "Error uploading file. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Function to handle bar click
  const handleBarClick = (data: any) => {
    console.log(data);
    // Find the investigator that was clicked
    const investigator = filteredData.find((inv) => inv.Investigador === data);
    if (investigator) {
      setSelectedInvestigator(investigator);
      setIsModalOpen(true);
    }
  };

  // Custom bar that allows click events
  const CustomBar = (props: any) => {
    const { x, y, width, height, Investigador } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#F97316"
          radius={10}
          rx={0}
          ry={10}
          onClick={() => handleBarClick(Investigador)}
          style={{ cursor: "pointer" }}
        />
      </g>
    );
  };

  // Format percentage for pie chart tooltip
  const formatPieTooltip = (value: number, total: number) => {
    const percent = ((value / total) * 100).toFixed(1);
    return `${value} puntos (${percent}%)`;
  };

  return (
    <div className="flex h-full flex-col items-center justify-center pb-12">
      <h1 className="text-7xl font-bold">
        <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Researcher Network
        </span>
      </h1>
      <p className="mt-3 text-4xl text-gray-300">
        Connect, collaborate, and innovate.
      </p>
      <img src="/logo.svg" alt="Logo" className="mt-8 h-48" />

      <div className="mt-12 w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full rounded-md border border-gray-600 bg-gray-800 p-4">
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-300"
              >
                Upload .sql dump File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".sql"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border border-gray-500 bg-gray-700 px-3 py-2 text-gray-200 file:mr-4 file:rounded-md file:border-0 file:bg-gray-600 file:px-4 file:py-2 file:text-gray-200 hover:file:bg-gray-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={uploading}
                className="rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 font-medium text-white hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {uploadStatus && (
              <div
                className={`mt-4 rounded-md p-3 ${uploadStatus.success ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}
              >
                {uploadStatus.message}
              </div>
            )}

            {file && !uploading && !uploadStatus && (
              <div className="mt-4 text-center text-sm text-gray-300">
                Ready to upload: {file.name}
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="mt-8 h-[500px] w-full rounded-2xl bg-gray-900 p-4 text-white shadow-lg">
        <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-orange-400">
            Puntaje Total de Investigadores
          </h2>
          <div className="mt-2 md:mt-0">
            <label
              htmlFor="areaFilter"
              className="mr-2 font-medium text-orange-400"
            >
              Filtrar por Área:
            </label>
            <select
              id="areaFilter"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="rounded-md border border-orange-400 bg-gray-800 px-3 py-1 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {allAreas.map((area) => (
                <option key={area as string} value={area as string}>
                  {area as string}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="flex items-center">
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                layout="vertical"
                data={filteredData}
                margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
              >
                <XAxis type="number" stroke="#F97316" />
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <YAxis
                  dataKey="Investigador"
                  type="category"
                  stroke="#F97316"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#F97316",
                  }}
                  cursor={{ fill: "#374151" }}
                  formatter={(value, name) => [
                    `${value} puntos`,
                    "Puntaje Total",
                  ]}
                  labelFormatter={(label) => {
                    const investigador = filteredData.find(
                      (inv) => inv.Investigador === label,
                    );
                    return `${investigador?.Investigador} (${investigador?.Area})`;
                  }}
                />
                <Bar
                  dataKey="PuntajeTotal"
                  barSize={20}
                  shape={<CustomBar />}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="ml-2 text-sm text-gray-400">
              <p>Click en una barra para ver detalles</p>
            </div>
          </div>
        ) : (
          <div className="flex h-5/6 items-center justify-center">
            <p className="text-xl text-gray-400">
              No hay datos para mostrar con este filtro.
            </p>
          </div>
        )}

        {selectedArea !== "Todos" && filteredData.length > 0 && (
          <div className="mt-4 text-center">
            <span className="font-medium text-orange-400">
              {filteredData.length} investigador
              {filteredData.length !== 1 ? "es" : ""} en el área de{" "}
              {selectedArea}
            </span>
          </div>
        )}
      </div>

      {/* Modal for Pie Chart */}
      {isModalOpen && selectedInvestigator && (
        <div className="bg-opacity-70 fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black">
          <div className="w-full max-w-2xl rounded-lg border border-orange-500 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-orange-400">
                Desglose de puntos: {selectedInvestigator.Investigador} (
                {selectedInvestigator.Area})
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center md:flex-row">
              <div className="w-full md:w-3/5">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getPieData(selectedInvestigator)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getPieData(selectedInvestigator).map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) =>
                        formatPieTooltip(
                          value as number,
                          Number(selectedInvestigator.PuntajeTotal),
                        )
                      }
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#F97316",
                      }}
                    />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 w-full md:mt-0 md:ml-4 md:w-2/5">
                <h4 className="mb-2 text-lg font-medium text-orange-400">
                  Distribución de puntos
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Estudiantes:</span>
                    <span className="font-medium">
                      {Number(selectedInvestigator.PuntosEstudiantes)} puntos
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Líneas Reconocidas:</span>
                    <span className="font-medium">
                      {Number(selectedInvestigator.PuntosLineasReconocidas)}{" "}
                      puntos
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Proyectos:</span>
                    <span className="font-medium">
                      {Number(selectedInvestigator.PuntosProyectos)} puntos
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Artículos:</span>
                    <span className="font-medium">
                      {Number(selectedInvestigator.PuntosArticulos)} puntos
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Eventos:</span>
                    <span className="font-medium">
                      {Number(selectedInvestigator.PuntosEventos)} puntos
                    </span>
                  </li>
                  <li className="mt-2 flex justify-between border-t border-gray-700 pt-2">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-orange-400">
                      {Number(selectedInvestigator.PuntajeTotal)} puntos
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
