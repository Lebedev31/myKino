
import { OptionsResponse, Transform, KinoBdLoading} from "./servicesInterface";



const services = ()=>{
    
    const request = async (url: string) =>{

        const options: OptionsResponse = {
            method: 'GET',
            headers: {
                 'X-API-KEY': 'CBZ6QAA-20C4NSF-NFB8QD3-7JGVMEP',
                 'accept': 'application/json'
                }
            }
        
        
      try {
        const response = await fetch(url, options);
        const res = await response.json();
        return res;
        
      }

      catch(e){
        console.log('Ой ошибочка вышла')
        throw e;
      }
          
    }

  

    const transformObject = async (url: string)=>{
         const transform: Transform = await request(url);
          return transform.docs;
    }

    const transformObject2 = async(url: string)=>{
       const transform: Transform = await request(url);
       return transform;
    }

    const request2 = async (url: string): Promise<KinoBdLoading> =>{
      try {
        const response = await fetch(url);
        const res = await response.json();
        return res;
        
      }

      catch(e){
        console.log('Ой ошибочка вышла')
        throw e;
      }
    }



 
    return {
        transformObject,
        transformObject2,
        request,
        request2, 
    
    }

}

export default services;
//'X-API-KEY': '2e637ce7-27e5-42ef-8393-28ef9d7b9012'
