import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"categoria"

class CategoriaService {

    getCategoria(){
        return axios.get(BASE_URL);
    }

    getCategoriaById(Id){
        return axios.get(BASE_URL + '/' + Id);
    }
    
    
}

export default new CategoriaService()

