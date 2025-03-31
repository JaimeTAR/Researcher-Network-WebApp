import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Home from "../components/Dashboard/Home";
import Footer from "../components/Footer";
import EmpleadosView from "../components/Dashboard/EmpleadosView";
import EstudiantesView from "../components/Dashboard/EstudiantesView";
import ProyectosView from "../components/Dashboard/ProyectosView";
import AreasView from "../components/Dashboard/AreasView";
import EspecialidadesView from "../components/Dashboard/EspecialidadesView";
import LineasInvestigacionView from "../components/Dashboard/LineasInvestigacionView";
import EventosView from "../components/Dashboard/EventosView";
import ArticulosView from "../components/Dashboard/ArticulosView";
import UnidadesView from "../components/Dashboard/UnidadesView";
import TiposEventosView from "../components/Dashboard/TiposEventosView";
import TiposEstudiantesView from "../components/Dashboard/TiposEstudiantesView";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("inicio");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "inicio":
        return <Home />;
      case "empleados":
        return <EmpleadosView />;
      case "estudiantes":
        return <EstudiantesView />;
      case "proyectos":
        return <ProyectosView />;
      case "areas":
        return <AreasView />;
      case "especialidades":
        return <EspecialidadesView />;
      case "lineas_investigacion":
        return <LineasInvestigacionView />;
      case "eventos":
        return <EventosView />;
      case "articulos":
        return <ArticulosView />;
      case "unidades":
        return <UnidadesView />;
      case "tipos_eventos":
        return <TiposEventosView />;
      case "tipos_estudiantes":
        return <TiposEstudiantesView />;
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Header toggleSidebar={toggleSidebar} />
      <div className="container mx-auto flex-1">{renderTabContent()}</div>
      <Footer />
    </div>
  );
};

export default Dashboard;
