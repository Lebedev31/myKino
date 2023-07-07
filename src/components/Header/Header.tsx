import '../Header/Header.scss';
import imgGlass from '../../icons/magnifier_105027.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { requestHeaderSearch } from '../../features/headerSlice/headerSlice';
import { AppDispatch } from '../../features/store/store';
import { useDispatch} from 'react-redux';
import SearchBlockFilmInfo from '../SearchBlockFilmInfo/SearchBlockFilmInfo';
import GlobalSearch from '../GlobalSearch/GlobalSearch';
import myImg from '../../icons/upscale_1 (2).png';

function Header(){
    const dispatch: AppDispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [textInput, setTextInput] = useState('');
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false); // для блока поиска фильма скрытие и сокрытие
    const [visible, setVisible] = useState(false); // для блока поиска фильма по жанрам и годам скрыие и сокрытие
    const [categories, setCategories] = useState('');


    
    function textInputValue(e: React.ChangeEvent<HTMLInputElement>) {
        setTextInput(e.target.value);
        if(textInput.length > 0){
           setIsVisible(true);
        }
    }
   
    useEffect(()=>{
       if(toggle === false){
         setIsVisible(false);
       }
    }, [toggle])

    
    function handleKeyPress(e:React.KeyboardEvent<HTMLInputElement>): void{
      if(e.key === 'Enter'){
         navigate('/filmList');
      }
    }

    useEffect(()=>{
        if(textInput.length > 0){
         dispatch(requestHeaderSearch(`https://kinobd.net/api/films/search/title?q=${textInput}`));
        }                           
        
    }, [textInput]);


   

   
    return (
      <header className="header">
          
             <div className='header__logo'>
                <img src={myImg} alt="картинка" />
             </div>
             <div onClick={(): void => {setToggle(!toggle); setVisible(false)}} className='header__search'>
                    <img src={imgGlass} alt="залупка" />
             </div>
             <nav className='header__nav'>
                <a onClick={()=> {setVisible(!visible); setCategories('movie')}}>Фильмы</a>
                <a onClick={()=> {setVisible(!visible); setCategories('tv-series')}} >Сериалы</a>
                <a onClick={()=> {setVisible(!visible); setCategories('cartoon')}}>Мультфильмы</a>
                <a onClick={()=> {setVisible(!visible); setCategories('anime')}}>Аниме</a>
             </nav>

          <input className={toggle? 'header__searchInput header-transition':'header__searchInput'} 
                 onChange={textInputValue}
                 onKeyPress={handleKeyPress}
                 type="text" 
                 placeholder='Что ищем?'/>
                
                <SearchBlockFilmInfo isVisible={isVisible}/>
                <GlobalSearch visible={visible} setVisible={setVisible} categories={categories}/>
      </header>
     
   )
}

export default Header