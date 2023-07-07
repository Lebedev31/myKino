import '../SearchBlockFilmInfo/SearchBlockFilmInfo.scss';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderInfoSelector } from '../../features/headerSlice/headerSliceInterface';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../features/store/store';
import { idForCinema } from '../../features/mainPage/mainPageSlice';


function SearchBlockFilmInfo({isVisible}: {isVisible: boolean}){

    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
  
    const headerSearchArray = useSelector((state: HeaderInfoSelector)=> state.headerSearch.headerData);
    
    const listOfElements = headerSearchArray.length <= 5 ? headerSearchArray : headerSearchArray.slice(0, 5);

    const elementStyle: React.CSSProperties = {
        visibility: isVisible ? 'visible' : 'hidden'
      };
    
    return (
        <div className='searchBlock' style={elementStyle}>
            <h3 className='searchBlock__title'>Фильмы и сериалы</h3>
            
            
            {listOfElements.map((item) => {
                return (

                    <div key={item.kinopoisk_id} 
                         onClick={()=>{navigate('/filmpage'); dispatch(idForCinema(item.kinopoisk_id)) } } 
                         className='searchBlock__item'>
                    
                    <div className='searchBlock__img'>
                        <img src={item.big_poster} alt="картинка" />
                    </div>
                    <div className='searchBlock__info'>
                         <h3 className='searchBlock__filmName'>{item.name_russian}</h3>
                         <p className='searchBlock__year'>{item.year}</p>
                         <p className='searchBlock__jenres'>{item.genres.map(item => item.name_ru + ' ')}</p>
                    </div>
                </div>
                )
            })}
            
               
            
            <div className='searchBlock__result'>{listOfElements.length > 0 ? 'Все результаты': 'Нет результатов'}</div>
        </div>
    )
}

export default SearchBlockFilmInfo;