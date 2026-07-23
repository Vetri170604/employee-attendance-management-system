import axios from "axios";

const API = axios.create({
    baseURL: "https://employee-attendance-management-system-ayem.onrender.com/api"
});

API.interceptors.request.use(
    (config) => {
<<<<<<< HEAD
        const token =
            localStorage.getItem(
                "access_token"
            );
        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }
      return config;
=======
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
>>>>>>> ccdd998c5ab3d5f382bc71410388fcc2342cc03c
    },
    (error) => {
        return Promise.reject(error);
    }
);
<<<<<<< HEAD
export default API;
=======

export default API;
>>>>>>> ccdd998c5ab3d5f382bc71410388fcc2342cc03c
