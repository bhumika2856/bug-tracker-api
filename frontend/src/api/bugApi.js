import api from "./api";

export const createBug = async (bugData) => {
  const response = await api.post("/bugs", bugData);
  return response.data;
};

export const getAllBugs = async (params = {}) => {
  const response = await api.get("/bugs", {
    params,
  });

  return response.data;
};

export const deleteBug = async (id) => {
  const response = await api.delete(`/bugs/${id}`);
  return response.data;
};

export const updateBug = async (id, data) => {
  const response = await api.put(`/bugs/${id}`, data);
  return response.data;
};

export const suggestPriority = async (id) => {
  const response = await api.post(`/bugs/${id}/suggest-priority`);
  return response.data;
};

export const generateSummary = async (id) => {
  const response = await api.post(`/bugs/${id}/generate-summary`);
  return response.data;
};

export const suggestFix = async (id) => {
  const response = await api.post(`/bugs/${id}/suggest-fix`);
  return response.data;
};

