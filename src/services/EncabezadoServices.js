import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL+"encabezadocanje"

class EncabezadoServices{

    getEncabezado(){
        return axios.get(BASE_URL);
    }

    getEncabezadoById(EncabezadoId){
        return axios.get(BASE_URL+"/"+EncabezadoId)
    }
    createEcabezado(encabezado){
        return axios.post(BASE_URL, encabezado);
    }
    
    getEcabezadoFormById(EncabezadoId){
        return axios.get(BASE_URL + '/getForm/'+ EncabezadoId);
    }
    
    updateEcabezado(encabezado){
        return axios.put(BASE_URL, encabezado);
    }
}
export default new EncabezadoServices()