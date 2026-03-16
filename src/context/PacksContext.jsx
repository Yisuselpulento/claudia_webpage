import { createContext, useContext, useState, useEffect } from "react";
import { getPacksFetching, getPackByIdFetching } from "../services/packsFetching";
import toast from "react-hot-toast";

const PacksContext = createContext();

export const usePacks = () => useContext(PacksContext);

export const PacksProvider = ({ children }) => {
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch todos los packs
  const fetchPacks = async () => {
    setLoading(true);
    const res = await getPacksFetching();
    setLoading(false);
    if (res.success) setPacks(res.data);
    else toast.error(res.message);
  };

  // Agregar, actualizar y eliminar
  const addPack = (pack) => setPacks(prev => [...prev, pack]);
  const updatePack = (updated) =>
    setPacks(prev => prev.map(p => (p._id === updated._id ? updated : p)));
  const removePack = (id) => setPacks(prev => prev.filter(p => p._id !== id));

  // Obtener pack del contexto
  const getPackById = (id) => packs.find(p => p._id === id) || null;

  const refreshPack = async (id) => {
  try {
    const res = await getPackByIdFetching(id)
    if (!res.success) {
      toast.error(res.message)
      return null
    }
    // Reemplaza o agrega el pack en el contexto
    updatePack(res.data)
    return res.data
  } catch (error) {
    toast.error("Error al refrescar el pack")
    return null
  }
}

  // Obtener pack del contexto o hacer fetch si no existe
  const getPackOrFetch = async (id) => {
    const cached = getPackById(id);
    if (cached) return cached;

    try {
      const res = await getPackByIdFetching(id);
      if (!res.success) {
        toast.error(res.message);
        return null;
      }
      addPack(res.data);
      return res.data;
    } catch (error) {
      toast.error("Error al obtener el pack");
      return null;
    }
  };

  // Fetch inicial al montar
  useEffect(() => {
    if (packs.length === 0) fetchPacks();
  }, []);

  return (
    <PacksContext.Provider
      value={{
        packs,
        loading,
        fetchPacks,
        addPack,
        updatePack,
        removePack,
        getPackById,
        getPackOrFetch,
        refreshPack // <-- útil para PackIdPage
      }}
    >
      {children}
    </PacksContext.Provider>
  );
};