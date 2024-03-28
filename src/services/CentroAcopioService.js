import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL+"centroacopio"

class CentroAcopioService{

    getCentroAcopio(){
        return axios.get(BASE_URL);
    }

    getCentroAcopioById(CentroAcopioId){
        return axios.get(BASE_URL+"/"+CentroAcopioId)
    }
    createCentroAcopio(centroAcopio){
        return axios.post(BASE_URL, centroAcopio);
    }
    
    getCentroAcopioFormById(CentroAcopioId){
        return axios.get(BASE_URL + '/getForm/'+ CentroAcopioId);
    }
    getCountByMaterial(){
        return axios.get(BASE_URL + '/getCountByMaterial' +1);
    }
    updateCentroAcopio(CentroAcopio){
        return axios.put(BASE_URL, CentroAcopio);
    }
}
export default new CentroAcopioService()