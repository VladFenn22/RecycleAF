import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"Provincia"

class ProvinciaServices {

    getProvincia(){
        return axios.get(BASE_URL);
    }

    getProvinciaById(ProvinciaId){
        return axios.get(BASE_URL + '/' + ProvinciaId);
    }
   
}

export default new ProvinciaServices()

