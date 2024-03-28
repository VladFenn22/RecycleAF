import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL+"cupon"
const BASE=import.meta.env.VITE_BASE_URL

class CuponService{

    getCupon(){
        return axios.get(BASE_URL);
    }

    getCuponById(CuponId){
        return axios.get(BASE_URL+"/"+CuponId)
    } 

    createCupon(cupon){
        return axios.post(BASE_URL, cupon);
    }
    getCuponFormById(cupon){
        return axios.get(BASE_URL + '/getForm/'+ cupon);
    }
    updateCupon(cupon){
        return axios.put(BASE_URL, cupon);
    }
    getImage(imageName) {
        return axios.get(BASE + '?image=' + imageName, {
          responseType: 'blob', 
        });
      }
      getImages(imageName) {
        return axios.get(BASE + '?image=' + imageName, {
          responseType: 'arraybuffer', 
        });
      }
}
export default new CuponService()