import React from "react";
import PackCard from "../components/Cards/PackCard";
import { useAuth } from "../context/AuthContext";
import { usePacks } from "../context/PacksContext";
import { deletePackFetching } from "../services/packsFetching";
import toast from "react-hot-toast";

const PacksPage = () => {
  const { packs, loading, removePack } = usePacks();
  const { admin } = useAuth();

  const handleDelete = async (packId) => {
    if (!window.confirm("¿Estás seguro de eliminar este pack?")) return;
    const res = await deletePackFetching(packId);
    if (!res.success) return toast.error(res.message);
    toast.success("Pack eliminado");
    removePack(packId);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Todos los Packs</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packs.map(pack => (
            <PackCard
              key={pack._id}
              pack={pack}
              onDelete={handleDelete}
              isAdmin={!!admin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PacksPage;