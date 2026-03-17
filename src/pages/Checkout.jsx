import { useCart } from "../context/CartContext"
import { createPaymentPreferenceFetching } from "../services/paymentFetching"

const Checkout = () => {
  const { cartItems, cartTotal } = useCart()

  const handlePayment = async () => {
    const res = await createPaymentPreferenceFetching(cartItems)

    if (!res.success) {
      console.error(res.message)
      return
    }

    // redirige al checkout de Mercado Pago
    window.location.href = res.init_point
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
            {/* Imagen del pack */}
            {pack.coverImage?.url && (
              <img
                src={pack.coverImage.url}
                alt={pack.title}
                className="w-16 h-16 object-cover rounded"
              />
            )}

            {/* Título y precio */}
            <div className="flex-1 flex justify-between items-center">
              <p className="font-medium">{pack.title}</p>
              <p className="font-semibold">
                ${pack.offer?.isActive ? pack.offer.price : pack.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xl font-semibold mb-4">Total: ${cartTotal}</p>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-primary text-white rounded hover:opacity-90 cursor-pointer"
        >
          Pagar con Mercado Pago
        </button>
      </div>
    </div>
  )
}

export default Checkout