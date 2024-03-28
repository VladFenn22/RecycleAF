import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"detallecanje"

class DetalleCanjeServices {

    getDetalle(){
        return axios.get(BASE_URL);
    }

    getDetalleById(detalleId){
        return axios.get(BASE_URL + '/' + detalleId);
    }
 
    createDetalle(detalle){
        return axios.post(BASE_URL, detalle);
    }
}

export default new DetalleCanjeServices()

