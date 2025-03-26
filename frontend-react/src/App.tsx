import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import { AreasDetailed } from "./interfaces";

function App() {
  const [areas, setAreas] = useState<AreasDetailed[]>();

  useEffect(() => {
    axios
      .get(`${API_URL}/areas`)
      .then((data) => data.data)
      .then((data) => setAreas(data))
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(areas);
  }, [areas]);

  return (
    <>
      <h1 className="m-6 w-fit cursor-pointer rounded-md border-1 border-red-500 px-4 py-2 hover:scale-105 hover:bg-red-100/10"></h1>
      {areas?.map((area) => (
        <h1 className="text-white" key={"asd" + area.idarea}>
          {area.descripcion}
        </h1>
      ))}
    </>
  );
}

export default App;
