import http from "../utils/http";

export const getWarranties = (searchModel, signal) =>
    http.post("warranty", searchModel, {
        signal, // Pass the AbortSignal for cancellation support
    });
export const getWarranty = (id) => http.get(`warranty/id/${id}`);

export const getWarrantyByCode = (cardNumber) => http.get(`warranty/${cardNumber}`);

export const createWarranty = (data) =>
    http.post("/warranty/create", data, {
        headers: {
            "Content-Type": "multipart/form-data", // Override Content-Type for this request
        },
    });

export const updateWarranty = (warrantyId, data) => {
    console.log(JSON.stringify(data));

    return http.put(`/warranty/update/${warrantyId}`, data, {
        headers: {
            "Content-Type": "multipart/form-data", // Override Content-Type for this request
        },
    });
};

export const deleteWarranty = (id) => http.delete(`warranty/${id}`);
export const deleteWarranties = (idList) =>
    http.delete(`warranty/deleteMany`, {
        data: idList,
    });
