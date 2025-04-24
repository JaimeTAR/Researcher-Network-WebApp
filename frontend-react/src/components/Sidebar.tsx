import { ReactNode, useEffect, useRef, useState } from "react";
import {
  BiBookContent,
  BiBookmark,
  BiBuilding,
  BiGridAlt,
  BiHome,
  BiUser,
} from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";
import { PiStudentBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { FaProjectDiagram } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";

const userMenuItems: MenuItem[] = [
  { icon: <BiHome size={20} />, label: "Inicio", name: "inicio" },
  {
    icon: <BiUser size={20} />,
    label: "Investigadores",
    name: "investigadores",
  },
  {
    icon: <PiStudentBold size={20} />,
    label: "Estudiantes",
    name: "estudiantes",
  },
  {
    icon: <FaProjectDiagram size={20} />,
    label: "Proyectos",
    name: "proyectos",
  },
  {
    icon: <RiArticleLine size={20} />,
    label: "Artículos",
    name: "articulos",
  },
  {
    icon: <MdEventAvailable size={20} />,
    label: "Eventos",
    name: "eventos",
  },
];

const adminMenuItems: MenuItem[] = [
  { icon: <BiGridAlt size={20} />, label: "Areas", name: "areas" },
  {
    icon: <BiBookContent size={20} />,
    label: "Especialidades",
    name: "especialidades",
  },
  {
    icon: <BiBookmark size={20} />,
    label: "Lineas Investigación",
    name: "lineas_investigacion",
  },
  { icon: <BiBuilding size={20} />, label: "Unidades", name: "unidades" },
  {
    icon: <CiSettings size={20} />,
    label: "Tipos de Eventos",
    name: "tipos_eventos",
  },
  {
    icon: <CiSettings size={20} />,
    label: "Tipos de Estudiante",
    name: "tipos_estudiantes",
  },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (name: string) => void;
}

interface MenuItem {
  icon: ReactNode;
  label: string;
  name: string;
}

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeTab,
  setActiveTab,
}: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    setMenuItems(userMenuItems);
    if (user?.role == "admin") {
      setMenuItems((prev) => [...prev, ...adminMenuItems]);
    }
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r border-gray-700 bg-gray-900 pt-5 pb-2 transition-transform duration-400 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-shrink-0 items-center justify-start px-4">
        <h1 className="text-2xl font-bold text-white">
          <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Researcher
          </span>
          <span className="mb-2 block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Network
          </span>
          <span className="block text-sm">WebApp</span>
        </h1>
      </div>
      <div className="mt-5 flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 bg-gray-900 px-2">
          {menuItems.map((item, index) => {
            const active = item.name == activeTab;
            return (
              <a
                onClick={() => {
                  toggleSidebar();
                  setActiveTab(item.name);
                }}
                key={index}
                className={`group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium ${active ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
              >
                <div
                  className={`mr-3 ${active ? "text-orange-500" : "text-gray-400 group-hover:text-white"}`}
                >
                  {item.icon}
                </div>
                {item.label}
                {active && (
                  <div className="absolute right-0 h-8 w-1 rounded-full bg-orange-500"></div>
                )}
              </a>
            );
          })}
        </nav>
      </div>
      <div className="mt-6 cursor-pointer border-t border-gray-700 p-4">
        <a
          onClick={logout}
          className="group mt-1 flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LuLogOut className="text-orange-500" />
          Cerrar sesión
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
