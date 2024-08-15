import axios from "axios";
import http from "../utils/http";

export const getWarranties = (searchModel, signal) =>
    http.post("warranty", searchModel, {
        signal, // Pass the AbortSignal for cancellation support
    });
export const getWarranty = (id) => http.get(`warranty/id/${id}`);

export const getWarrantyByCode = (cardNumber) => http.get(`warranty/${cardNumber}`);

export const createWarranty = (data) => http.post("/warranty", data);

export const updateWarranty = (data) => http.put(`/warranty`, data);

export const deleteWarranty = (id) => http.delete(`warranty/${id}`);
// export const deleteWarranties = (idList) =>
//     http.delete(`warranty/deleteMany`, {
//         data: idList,
//     });
export const deleteWarranties = (idList) =>
  axios({
      method: 'DELETE',
      url: `https://localhost:44348/api/v1/Warranty/deleteMany`,
      data: idList, // Dữ liệu gửi đi trong thân yêu cầu
      headers: {
          "Content-Type": "application/json",
      },
  });