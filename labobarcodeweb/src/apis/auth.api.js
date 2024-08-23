import http from "../utils/http";

export const authByCode = (cardNumber) => http.get(`warranty/authByCode/${cardNumber}`);

