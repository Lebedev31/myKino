import { Link} from "react-router-dom";
import myImage from '../../icons/3818850.jpg';



const ErrorSVG = () => {

  
    return (

    <>
   <div><Link to='/'>Вернуться на главную</Link></div>  
      
      <div style={{width: '50%', height: '40%', margin: '0 auto'}}>
        <img src={myImage} alt="картинка" style={{width: '100%', height:'100%'}}/>
      </div>
    </>
   
  )
}
  
  export default ErrorSVG;