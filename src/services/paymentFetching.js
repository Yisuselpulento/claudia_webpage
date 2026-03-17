import axiosInstance from "../config/axiosConfig.js";

const handleRequest = async (request) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
    };
  }
};

/* -------------------------- CREATE PAYMENT -------------------------- */
export const createPaymentPreferenceFetching = async (items) =>
  handleRequest(
    axiosInstance.post("/api/payment/create-preference", { items })
  );

  export const verifyPaymentFetching = async (paymentId) =>
  handleRequest(
    axiosInstance.get(`/api/payment/verify/${paymentId}`)
  );