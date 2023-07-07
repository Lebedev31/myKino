import Slider, {Settings} from "react-slick";
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import '../Slider/Slider.scss';
import { fetchPremieres } from '../../features/premiere/premiereSlise';
import {useEffect} from 'react';
import { IPremierArr, PremieresMain } from "../../features/premiere/premieresInterface";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../../features/store/store";
import Spinner from "../Spinner/Spinner";
import { Navigate, useNavigate } from "react-router";
import { idForCinema } from '../../features/mainPage/mainPageSlice';



const MySlider = () => {

const navigate = useNavigate();

const dispatch: AppDispatch = useDispatch();

const premieresArray = useSelector((state:IPremierArr) => state.premiere.premieres);
const loadingStatus = useSelector((state:IPremierArr) => state.premiere.premieresLoadingStatus);



useEffect(()=>{
  dispatch(fetchPremieres('https://api.kinopoisk.dev/v1.3/movie?selectFields=name&selectFields=id&selectFields=poster&selectFields=year&page=1&limit=20&premiere.world=01.03.2023-01.06.2023'));
}, []);

function transformPremieres(): PremieresMain[] {
    const transform = premieresArray.map(item => {
        return {
           name: item.name,
           poster: item.poster,
           year: item.year,
           id: item.id, 
        }
    })

    return transform;
}

    
    const settings: Settings = {
        infinite: true, 
        speed: 500, 
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 4000, 
    }

const totalPremieres = transformPremieres();

  
if(loadingStatus === 'loading'){
    return (
        <div className="spinner">
           <Spinner/>
        </div>
    )
}

if(loadingStatus === 'error'){
    return (
        <Navigate to='*'/>
    )
}

return (
    
    <Slider {...settings} className="slider">
       {totalPremieres.map((item): JSX.Element =>{
            return <div onClick ={(e)=> {dispatch(idForCinema(item.id)); navigate('/filmpage')}} key={item.id} className="slider__item">
                        <h2 className="slider__name">{item.name}</h2>
                        <div className="slider__img">
                            <img src={item.poster.url} alt="постер" />
                        </div>
                   
            </div>
       
        }       
          
       )}
    </Slider>
     

)

}

 

export default MySlider;
//