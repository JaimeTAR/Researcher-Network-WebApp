import { useEffect, useState } from "react";
import { CategoriesContext } from "../hooks/useCategories";
import {
  Areas,
  Carreras,
  Investigadores,
  NivelEducacion,
  NivelSnii,
  TipoEstudiantes,
  TipoEventos,
  Unidades,
} from "../utils/interfaces";
import { request } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const fetchAreas = async (): Promise<Areas[]> => {
  return request("get", "/areas/");
};

const fetchNivelesEdu = async (): Promise<NivelEducacion[]> => {
  return request("get", "/niveleducacion/");
};

const fetchNivelesSnii = async (): Promise<NivelSnii[]> => {
  return request("get", "/nivelsnii/");
};

const fetchTiposEstudiantes = async (): Promise<TipoEstudiantes[]> => {
  return request("get", "/tipoestudiantes/");
};

const fetchCarreras = async (): Promise<Carreras[]> => {
  return request("get", "/carreras/");
};

const fetchInvestigadores = async (): Promise<Investigadores[]> => {
  return request("get", "/investigadores/");
};

const fetchUnidades = async (): Promise<Unidades[]> => {
  return request("get", "/unidades/");
};

const fetchTiposEventos = async (): Promise<TipoEventos[]> => {
  return request("get", "/tipodeeventos/");
};

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuth();
  const [areas, setAreas] = useState<Areas[]>([]);
  const [nivelesEdu, setNivelesEdu] = useState<NivelEducacion[]>([]);
  const [nivelesSnii, setNivelesSnii] = useState<NivelSnii[]>([]);
  const [tiposEstudiantes, setTiposEstudiantes] = useState<TipoEstudiantes[]>(
    [],
  );
  const [carreras, setCarreras] = useState<Carreras[]>([]);
  const [investigadores, setInvestigadores] = useState<Investigadores[]>([]);
  const [unidades, setUnidades] = useState<Unidades[]>([]);
  const [tiposEventos, setTiposEventos] = useState<TipoEventos[]>([]);

  useEffect(() => {
    const getAreas = async () => {
      const data = await fetchAreas();
      setAreas(data);
    };
    const getNivelesEdu = async () => {
      const data = await fetchNivelesEdu();
      setNivelesEdu(data);
    };
    const getNivelesSnii = async () => {
      const data = await fetchNivelesSnii();
      setNivelesSnii(data);
    };
    const getTiposEstudiantes = async () => {
      const data = await fetchTiposEstudiantes();
      setTiposEstudiantes(data);
    };
    const getCarreras = async () => {
      const data = await fetchCarreras();
      setCarreras(data);
    };
    const getInvestigadores = async () => {
      const data = await fetchInvestigadores();
      setInvestigadores(data);
    };
    const getUnidades = async () => {
      const data = await fetchUnidades();
      setUnidades(data);
    };
    const getTiposEventos = async () => {
      const data = await fetchTiposEventos();
      setTiposEventos(data);
    };

    if (isAuthenticated) {
      getAreas();
      getNivelesEdu();
      getNivelesSnii();
      getTiposEstudiantes();
      getCarreras();
      getInvestigadores();
      getUnidades();
      getTiposEventos();
    }
  }, [isAuthenticated]);

  return (
    <CategoriesContext.Provider
      value={{
        areas,
        nivelesEdu,
        nivelesSnii,
        tiposEstudiantes,
        carreras,
        investigadores,
        unidades,
        tiposEventos,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
