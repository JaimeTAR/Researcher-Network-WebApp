import { FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex justify-center border-b border-gray-700 bg-gray-800 px-6 py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar ? toggleSidebar : goBack}
            className="mr-4 cursor-pointer rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            {toggleSidebar ? <FiMenu size={20} /> : <MdArrowBack size={20} />}
          </button>
          <h1 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Researcher Network
            </span>{" "}
            WebApp
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full border-2 border-orange-500">
              <FaRegUser size={"100%"} className="p-1 text-orange-500" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-white">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
