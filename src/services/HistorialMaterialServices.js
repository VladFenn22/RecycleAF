import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL+"historialmaterial"

class HistorialMaterialServices{

    getHistorialMaterial(){
        return axios.get(BASE_URL);
    }

    getHistorialMaterialByIdCentroAcopio(Id){
        return axios.get(BASE_URL+"/"+Id)
    } 
    createHistorialMaterial(historial){
        return axios.post(BASE_URL, historial);
    }
    
}
export default new HistorialMaterialServices()