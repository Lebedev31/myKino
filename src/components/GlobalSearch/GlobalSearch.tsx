import '../GlobalSearch/GlobalSearch.scss';
import {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../../features/store/store';
import { requestJenresHeader } from '../../features/jenresHeaderSlice/jenresHeaderSlice';
import { Link } from 'react-router-dom';



function GlobalSearch({visible , setVisible, categories}:{visible: boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>, categories:string }){
 
  
   const[valueInput1, setValueInput1] = useState('2020');
   const[valueInput2, setValueInput2] = useState('2023');
   const[valueInput3, setValueInput3] = useState('');
   const[jenres, setJenres] = useState('');
   const year: string = `${valueInput1}-${valueInput2}`;
   const _apiYear: string = `https://api.kinopoisk.dev/v1.3/movie?selectFields=description&selectFields=genres&selectFields=id&selectFields=logo&selectFields=poster&selectFields=type&selectFields=name&page=1&limit=50&type=${categories}&year=${year}`
   const _apiJenres: string = `https://api.kinopoisk.dev/v1.3/movie?selectFields=description&selectFields=genres&selectFields=id&selectFields=logo&selectFields=poster&selectFields=type&selectFields=name&page=1&limit=50&type=${categories}&year=${year}&genres.name=${jenres}`
   const categoriesTranslation: string = `${categories === 'movie'? 'Фильмы': null || categories === 'tv-series'? 'Сериалы': null || categories === 'cartoon'? 'Мультфильмы': null || categories === 'anime'? 'Аниме': null }`;
   const _apiActors: string = `https://api.kinopoisk.dev/v1.3/movie?selectFields=description&selectFields=genres&selectFields=id&selectFields=logo&selectFields=poster&selectFields=type&selectFields=name&page=1&limit=50&persons.name=${valueInput3}`;
   

   
   const dispatch: AppDispatch = useDispatch();

    const elementStyle: React.CSSProperties = {
        visibility: visible ? 'visible' : 'hidden'
      };

    function foscusDataNumber(e: React.FocusEvent<HTMLInputElement>, num: string) {
         e.target.value = num;
         e.target.placeholder = 'С какого года';
         e.target.className = 'globalSearch__input inputPlaceholder';
         setValueInput1('2020');
    }

   

    function foscusDataNumber2(e: React.FocusEvent<HTMLInputElement>, num: string) {
        e.target.value = num;
        e.target.placeholder = 'По какой год';
        e.target.className = 'globalSearch__input inputPlaceholder';
        setValueInput2('2023');
   }
    
    
    function blurfocusNumber(e: React.FocusEvent<HTMLInputElement>){
        const value = parseInt(e.target.value);
        if(value < 1960 || value > 2023){
            e.target.value = '';
            e.target.placeholder = 'Введите дату верно';
            e.target.className = 'globalSearch__input inputPlaceholder-error';
            setValueInput1('');
            setValueInput2('');
        }
    }

    useEffect(()=>{
        dispatch(requestJenresHeader(_apiJenres));
    },[jenres]);

    useEffect(()=>{
        setValueInput1('2020');
        setValueInput2('2023');
    }, [visible]);



    return(
        <section className='globalSearch' style={elementStyle} onMouseLeave={()=> setVisible(false)}>
                <div className='globalSearch__infoSearch'>
                    <div className='globalSearch__infoYear'>
                        <h2>Поиск фильма по дате, с 1960 года по 2023 год</h2>
                        <input onFocus={(e)=> foscusDataNumber(e,'2020')}
                               className='globalSearch__input inputPlaceholder'
                               type="number" 
                               placeholder='С какого года'
                               onBlur={blurfocusNumber} 
                               onChange={(e)=> setValueInput1(e.target.value)}
                               value={valueInput1}/>
                        
                        <input 
                              onFocus={(e)=> foscusDataNumber2(e, '2023')} 
                              className='globalSearch__input inputPlaceholder' 
                              type="number" 
                              placeholder='По какой год'
                              onBlur={blurfocusNumber} 
                              onChange={(e)=> setValueInput2(e.target.value)}
                              value={valueInput2}/>
                       
                      <Link to='/filmListJenres'>  <button onClick={()=> {dispatch(requestJenresHeader(_apiYear))}} className='globalSearch__button'>Искать</button></Link>
                    </div>
                   
                    <div className='globalSearch__persons'>
                         <h2>Поиск по актерам:</h2>
                          <input className='globalSearch__input' 
                                 type="text" 
                                 placeholder='Введите имя актера' 
                                 minLength={2} maxLength={40}
                                 onChange={(e)=> setValueInput3(e.target.value)}/>
                      <Link to='/filmListJenres'>    <button onClick={()=> dispatch(requestJenresHeader(_apiActors))} className='globalSearch__button'>Искать</button></Link>
                    </div>
                </div>
                
                <h2 className='globalSearch__title'>Жанры ({`${categoriesTranslation} ${year}` })</h2>
                <div className='globalSearch__jenres'>
                    <ul className='globalSearch__block'>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('семейный')} className='globalSearch__item'>Семейный</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('криминал')} className='globalSearch__item'>Криминал</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('боевик')} className='globalSearch__item'>Боевик</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('фантастика')} className='globalSearch__item'>Фантастика</li></Link>
                    </ul>

                    <ul className='globalSearch__block'>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('детектив')} className='globalSearch__item'>Детектив</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('драма')} className='globalSearch__item'>Драма</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('история')} className='globalSearch__item'>Исторический</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('комедия')} className='globalSearch__item'>Комедия</li></Link>
                    </ul>

                    <ul className='globalSearch__block'>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('фэнтези')} className='globalSearch__item'>Фэнтези</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('ужасы')} className='globalSearch__item'>Ужасы</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('мелодрама')} className='globalSearch__item'>Мелодрама</li></Link>
                    <Link to='/filmListJenres'><li onClick={()=> setJenres('приключения')} className='globalSearch__item'>Приключения</li></Link>
                    </ul>


                </div>
        </section>
    )
}

export default GlobalSearch;