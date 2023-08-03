import axios from 'axios';

const axiosApi = axios.create({
    baseURL: "https://staging.mazaady.com/api/v1/"
});
const API_KEY= "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
axiosApi.defaults.headers.common['private-key'] = API_KEY;


export default axiosApi;
