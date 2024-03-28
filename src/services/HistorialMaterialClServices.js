import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL+"historialmaterialcl"

class HistorialMaterialClServices{

    getHistorialMaterial(){
        return axios.get(BASE_URL);
    }

    getHistorialMaterialByIdCliente(Id){
        return axios.get(BASE_URL+"/"+Id)
    } 
    
    
}
export default new HistorialMaterialClServices()