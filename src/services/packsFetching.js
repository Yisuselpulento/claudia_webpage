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

/* -------------------------- CREATE PACK -------------------------- */
export const createPackFetching = async (packData) =>
  handleRequest(
    axiosInstance.post("/api/packs", packData)
  );

/* -------------------------- GET ALL PACKS -------------------------- */
export const getPacksFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/packs")
  );

/* -------------------------- GET PACK BY ID -------------------------- */
export const getPackByIdFetching = async (packId) =>
  handleRequest(
    axiosInstance.get(`/api/packs/${packId}`)
  );

/* -------------------------- UPDATE PACK -------------------------- */
export const updatePackFetching = async (packId, updatedData) =>
  handleRequest(
    axiosInstance.put(`/api/packs/${packId}`, updatedData)
  );

/* -------------------------- DELETE PACK -------------------------- */
export const deletePackFetching = async (packId) =>
  handleRequest(
    axiosInstance.delete(`/api/packs/${packId}`)
  );