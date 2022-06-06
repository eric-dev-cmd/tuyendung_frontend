import axiosClient from "./axiosClient";

const FieldCompanyApi = {
  getListFieldsCompany: () => {
    const url = `/linhVucs`;
    return axiosClient.get(url);
  },
  getListFieldsLinhVucById: (id) => {
    const url = `/linhVucs/${id}`;
    return axiosClient.get(url);
  },
  getCompanyById: (slug) => {
    const url = `/nhatuyendungs/timKiem/${slug}`;
    return axiosClient.get(url);
  },
};

export default FieldCompanyApi;
