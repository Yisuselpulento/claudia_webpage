import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPaymentFetching, verifyPayPalPaymentFetching } from "../services/paymentFetching";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const SuccessContent = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("token") || searchParams.get("orderId") || searchParams.get("order_id");

  const [packs, setPacks] = useState([]);
  const [downloadTokens, setDownloadTokens] = useState({});
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      let res;
      let errorMessage = null;

      if (orderId) {
        res = await verifyPayPalPaymentFetching(orderId);
      } else if (paymentId) {
        res = await verifyPaymentFetching(paymentId);
      } else {
        setLoading(false);
        return;
      }

      if (res?.success) {
        if (res.packsData && res.packsData.length > 0) {
          setPacks(res.packsData);
          
          if (res.downloadTokens) {
            const tokensMap = {};
            res.downloadTokens.forEach((t, index) => {
              tokensMap[res.packsData[index]?._id] = t;
            });
            setDownloadTokens(tokensMap);
            
            localStorage.setItem("purchasedPacks", JSON.stringify({
              packs: res.packsData,
              tokens: tokensMap,
              timestamp: Date.now()
            }));
          }
          
          clearCart();
          toast.success(res.isDuplicate ? "Compra ya procesada" : "¡Compra exitosa!");
        } else {
          errorMessage = "No se encontraron packs asociados a esta compra";
        }
      } else {
        errorMessage = res?.message || "Error verificando el pago";
      }
      
      if (errorMessage) {
        toast.error(errorMessage);
      }
      setLoading(false);
    };

    if (paymentId || orderId) verify();
  }, []);

  const handleDownload = (pack) => {
    const tokenData = downloadTokens[pack._id];
    
    if (tokenData?.downloadUrl) {
      window.location.href = tokenData.downloadUrl;
    } else {
      const stored = JSON.parse(localStorage.getItem("purchasedPacks") || "{}");
      const storedToken = stored.tokens?.[pack._id];
      
      if (storedToken?.downloadUrl) {
        window.location.href = storedToken.downloadUrl;
      } else {
        alert("Token de descarga no disponible. Contacta soporte.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">¡Compra exitosa!</h1>
        <p className="text-gray-400">Tus packs están listos para descargar</p>
      </div>

      <div className="space-y-4">
        {packs.map((pack, index) => (
          <div
            key={pack._id}
            className="border border-white/10 rounded-lg p-4 flex items-center gap-4 bg-white/5"
          >
            {pack.coverImage?.url && (
              <img
                src={pack.coverImage.url}
                alt={pack.title}
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-white">{pack.title}</h3>
              <p className="text-gray-500 text-sm">
                {pack.tags?.join(", ") || "Pack de imágenes"}
              </p>
            </div>
            <button
              onClick={() => handleDownload(pack)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
        <p className="text-sm text-amber-400">
          <strong>Nota:</strong> Los enlaces de descarga caducan en 1 hora. 
          Guarda tus archivos pronto. Si necesitas descargar más tarde, 
          visita esta página again con el mismo navegador.
        </p>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <SuccessContent />
    </div>
  )
}

export default SuccessPage;