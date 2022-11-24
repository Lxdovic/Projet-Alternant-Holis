import axios from 'axios';

axios.interceptors.request.use(
  async (config) => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const session = JSON.parse(localStorage.getItem('session'));

    const config = error?.config;

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;

      const result = await axios.post('http://localhost:5001/token', {refreshToken: session?.refreshToken})

      if (result?.data.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.data.accessToken}`,
        };

        session.accessToken = result?.data.accessToken

        localStorage.setItem('session', JSON.stringify(session))
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default axios;