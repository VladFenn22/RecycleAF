import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"administrador"

class AdministradorService {

    getAdmins(){
        return axios.get(BASE_URL);
    }

    getAdminById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
    
    getAdmin(id){
        return axios.get(BASE_URL+ '/admin/' + id);
   }
}

export default new AdministradorService()

