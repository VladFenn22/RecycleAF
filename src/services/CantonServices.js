import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"canton"

class CantonServices {

    getCanton(){
        return axios.get(BASE_URL);
    }

    getCantonById(CantonId){
        return axios.get(BASE_URL + '/' + CantonId);
    }
    
   
}

export default new CantonServices()

