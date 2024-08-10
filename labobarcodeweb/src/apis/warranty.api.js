import http from "../utils/http"

export const getWarrantys = (page, limit, signal) =>
  http.get('students', {
    params: {
      _page: page,
      _limit: limit
    },
    signal
  })

export const getWarranty = (id) => http.get(`warranty/id/${id}`)

export const createWarranty = (data) => http.post('/warranty', data)

export const updateWarranty = (data) => http.put(`/warranty`, data)

export const deleteWarranty = (id) => http.delete(`warranty/${id}`)