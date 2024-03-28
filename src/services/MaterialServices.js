import axios from 'axios';

const BASE_URL=import.meta.env.VITE_BASE_URL+"material"
const BASE=import.meta.env.VITE_BASE_URL

class MaterialService{

    getMaterial(){
        return axios.get(BASE_URL);
    }

    getMaterialById(MaterialId){
        return axios.get(BASE_URL+"/"+MaterialId)
    } 
    createMaterial(material){
        return axios.post(BASE_URL, material);
    }
    getMaterialFormById(material){
        return axios.get(BASE_URL + '/getForm/'+ material);
    }
    updateMaterial(material){
        return axios.put(BASE_URL, material);
    }
    getMaterialCentroAcopio(centroAcopio){
      return axios.get(BASE_URL + '/getMaterialCentroAcopio/'+ centroAcopio);
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
export default new MaterialService()