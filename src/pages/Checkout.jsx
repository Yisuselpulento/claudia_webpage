import { useState } from "react"
import { useCart } from "../context/CartContext"
import { createPaymentPreferenceFetching, createPayPalOrderFetching } from "../services/paymentFetching"

const Checkout = () => {
  const { cartItems, cartTotal } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("mercadopago")
  const [isLoading, setIsLoading] = useState(false)

  const handleMercadoPago = async () => {
    setIsLoading(true)
    const res = await createPaymentPreferenceFetching(cartItems)
    setIsLoading(false)

    if (!res.success) {
      console.error(res.message)
      return
    }

    window.location.href = res.init_point
  }

  const handlePayPal = async () => {
    setIsLoading(true)
    const res = await createPayPalOrderFetching(cartItems)
    setIsLoading(false)

    if (!res.success) {
      console.error(res.message)
      return
    }

    if (res.approveUrl) {
      window.location.href = res.approveUrl
    }
  }

  const handlePayment = async () => {
    if (paymentMethod === "mercadopago") {
      await handleMercadoPago()
    } else {
      await handlePayPal()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map(pack => (
          <div
            key={pack._id}
            className="flex items-center justify-between border-b pb-2 gap-4"
          >
            {pack.coverImage?.url && (
              <img
                src={pack.coverImage.url}
                alt={pack.title}
                className="w-16 h-16 object-cover rounded"
              />
            )}

            <div className="flex-1 flex justify-between items-center">
              <p className="font-medium">{pack.title}</p>
              <p className="font-semibold">
                ${pack.offer?.isActive ? pack.offer.price : pack.price} USD
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xl font-semibold mb-4">Total: ${cartTotal} USD</p>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setPaymentMethod("mercadopago")}
            className={`flex-1 py-2 px-4 rounded border ${
              paymentMethod === "mercadopago"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            MercadoPago
          </button>
          <button
            onClick={() => setPaymentMethod("paypal")}
            className={`flex-1 py-2 px-4 rounded border ${
              paymentMethod === "paypal"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            PayPal
          </button>
        </div>

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full py-3 bg-primary text-white rounded hover:opacity-90 cursor-pointer disabled:opacity-50"
        >
          {isLoading
            ? "Procesando..."
            : paymentMethod === "mercadopago"
            ? "Pagar con MercadoPago"
            : "Pagar con PayPal"}
        </button>
      </div>
    </div>
  )
}

export default Checkout