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

/* -------------------------- ADMIN LOGIN -------------------------- */
export const adminLoginFetching = async (loginData) =>
  handleRequest(
    axiosInstance.post("/api/admin/login", loginData)
  );

/* -------------------------- ADMIN LOGOUT -------------------------- */
export const adminLogoutFetching = async () =>
  handleRequest(
    axiosInstance.post("/api/admin/logout")
  );

/* -------------------------- GET ADMIN SESSION -------------------------- */
export const getAdminSessionFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/admin/check")
  );