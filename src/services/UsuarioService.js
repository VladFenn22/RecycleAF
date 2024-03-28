import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL+"usuario"

class UsuarioService {

    getUsuarios(){
        return axios.get(BASE_URL);
    }

    getUsuarioById(UsuarioId){
        return axios.get(BASE_URL + '/' + UsuarioId);
    }
    createUsuario(User){
        return axios.post(BASE_URL, User);
    }
    loginUsuario(User){
        return axios.post(BASE_URL+ '/login/', User);
    }
    getUsuarioClientes(){
        return axios.get(BASE_URL + '/getClientes/2');
    }
}

export default new UsuarioService()

