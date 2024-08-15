import http from "../utils/http";

export const getWarrantys = (searchModel, signal) =>
    http.post("warranty", searchModel, {
        signal, // Pass the AbortSignal for cancellation support
    });
export const getWarranty = (id) => http.get(`warranty/id/${id}`);

export const getWarrantyByCode = (cardNumber) => http.get(`warranty/${cardNumber}`);

export const createWarranty = (data) => http.post("/warranty", data);

export const updateWarranty = (data) => http.put(`/warranty`, data);

export const deleteWarranty = (id) => http.delete(`warranty/${id}`);
export const deleteWarrantys = (idList) => http.post(`warranty`, idList);
