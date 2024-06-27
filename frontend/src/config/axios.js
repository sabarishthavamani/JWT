import axios from 'axios';

// import config
import config from './index';


axios.defaults.baseURL = config.SERVER_URL;


export default axios;