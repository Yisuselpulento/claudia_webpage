import axiosInstance from "../config/axiosConfig.js"

const handleRequest = async (request) => {
  try {
    const { data } = await request
    return data
  } catch (error) {
    if (error.response?.data) {
      return error.response.data
    }
    return {
      success: false,
      message: "No se pudo conectar con el servidor"
    }
  }
}

export const getAllSalesFetching = async (page = 1, limit = 10) =>
  handleRequest(axiosInstance.get(`/api/sales?page=${page}&limit=${limit}`))

export const getSalesStatsFetching = async () =>
  handleRequest(axiosInstance.get("/api/sales/stats"))

export const getSaleByIdFetching = async (id) =>
  handleRequest(axiosInstance.get(`/api/sales/${id}`))