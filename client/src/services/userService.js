import API from "../api/api";

export const saveUser = async (userData) => {
  try {
    const response = await API.post("/user", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};