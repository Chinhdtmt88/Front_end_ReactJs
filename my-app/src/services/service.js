import api from "../utils/api";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAlltour: async function () {
    try {
      const response = await api.get("/api/v1/tours");
      console.log(response.data.data.data);
      if (
        (response.status >= 200 && response.status < 400) ||
        response.data.success
      ) {
        return response.data.data.data;
      } else if (response.status === 401) {
        window.location.reload();
        return { errors: response.data.errors };
      }
      return {
        errors: response.data.errors,
      };
    } catch (e) {
      if (e.response) {
        return {
          ...e.response.data,
          responseStatus: e.response.status,
        };
      }
    }
  },
};
