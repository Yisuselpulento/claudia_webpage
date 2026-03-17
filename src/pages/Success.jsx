import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPaymentFetching } from "../services/paymentFetching";
import { downloadPackFetching } from "../services/downloadFetching";
import { useCart } from "../context/CartContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  const [packs, setPacks] = useState([]); // Ahora guardamos los packs completos
  const { clearCart } = useCart();

  useEffect(() => {
    const verify = async () => {
      const res = await verifyPaymentFetching(paymentId);

      if (res.success) {
        setPacks(res.packsData); // <-- packsData debe venir completo desde el backend
        clearCart();
      }
    };

    if (paymentId) verify();
  }, []);

  const handleDownload = async (pack) => {
    // pack.zipFile.url o pack._id dependiendo cómo tu backend devuelva
    const res = await downloadPackFetching(pack._id);

    if (!res || res.success === false) {
      alert(res?.message || "Error al descargar el pack");
      return;
    }

    // Descarga usando blob
    const url = window.URL.createObjectURL(res);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pack.title}.zip`; // Ahora el nombre correcto
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Compra exitosa 🎉</h1>
      <p className="mb-4">Tus packs comprados:</p>

      <div className="flex flex-col gap-2">
        {packs.map((pack) => (
          <button
            key={pack._id}
            onClick={() => handleDownload(pack)}
            className="p-3 bg-primary text-white rounded text-center cursor-pointer hover:bg-primary/80 transition"
          >
            Descargar {pack.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Success;