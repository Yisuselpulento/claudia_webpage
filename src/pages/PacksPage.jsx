import React from "react";
import PackCard from "../components/Cards/PackCard";
import { useAuth } from "../context/AuthContext";
import { usePacks } from "../context/PacksContext";
import { deletePackFetching } from "../services/packsFetching";
import toast from "react-hot-toast";
import { FaShoppingCart, FaFilter } from "react-icons/fa";

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
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tienda</h1>
            <p className="text-gray-500 mt-1">{packs.length} packs disponibles</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-500">
            <FaFilter className="w-4 h-4" />
            <span className="text-sm">Filtrar</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : packs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingCart className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">No hay packs disponibles</p>
            <p className="text-gray-600 text-sm mt-1">Vuelve más tarde</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default PacksPage;