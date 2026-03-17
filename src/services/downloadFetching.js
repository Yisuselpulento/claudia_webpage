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

/* -------------------------- DOWNLOAD PACK -------------------------- */
export const downloadPackFetching = async (packId) =>
  handleRequest(
    axiosInstance.get(`/api/download/pack/${packId}`, {
      responseType: "blob" // importante para archivos binarios
    })
  );