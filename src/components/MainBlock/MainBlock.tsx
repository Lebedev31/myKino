import '../MainBlock/MainBlock.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store/store';
import {useEffect, useState} from 'react';
import { changeСategory, fetchMainPage } from '../../features/mainPage/mainPageSlice';
import { MainBlockSelector } from '../../features/mainPage/mainPageInterface';
import myIcons from '../../icons/free-icon-arrow-right-2267883.png'
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import {Link} from 'react-router-dom';
import { idForCinema } from '../../features/mainPage/mainPageSlice';
import { Navigate } from 'react-router-dom';
import '../../style/button.scss';
import BlockPagination from '../BlockPagination/BlockPagination';



function MainBlock (){


   const dispatch: AppDispatch = useDispatch();
   const mainArray = useSelector((state: MainBlockSelector)=> state.mainBlock.mainBlockArray); // селектор массива запроса
   const mainLoadingStatus = useSelector((state:MainBlockSelector)=> state.mainBlock.mainBlockLoadingStatus);// селектор статуса запроса
   const[numberPage, setNumberpage] = useState(1); // страница запроса
   const[type, setType] = useState(''); // тип запроса (аниме, фильмы, сериалы...)
   const[typeNumber, setTypeNumber] = useState(0); // номер запроса , в цифрах жанр (аниме, фильмы...). Хз почему, но без типа и номера не работает запрос
   const [periodOfTime, setPeriodOfTime] = useState(''); // какой период времени показывать фильмы
   const [toggle, setToggle] = useState(false);// переключатель стрелок
  

   const _api = `https://api.kinopoisk.dev/v1.3/movie?selectFields=name&selectFields=id&selectFields=poster&selectFields=year&page=${numberPage}&limit=10&year=2023`
   const _api2 = `https://api.kinopoisk.dev/v1.3/movie?selectFields=name&selectFields=id&selectFields=poster&selectFields=year&page=${numberPage}&limit=10&type=${type}&typeNumber=${typeNumber}&year=${periodOfTime}`
  
   useEffect(()=>{
        dispatch(fetchMainPage(`https://api.kinopoisk.dev/v1.3/movie?selectFields=name&selectFields=id&selectFields=poster&selectFields=year&page=1&limit=10&year=2023`))
   }, []);


    
   function paginationMainBlockNext():void {
       setNumberpage(numberPage + 1);
   }


   function paginationMainBlockPrev():void{
      if(numberPage > 1){
         setNumberpage(numberPage - 1);
      }
   }

useEffect(()=>{     
    if(toggle){
        dispatch(fetchMainPage(_api2))
    }
    if(!toggle){
        dispatch(fetchMainPage(_api))
  }
   
}, [numberPage]);

function generalStatusSwitch(type: string, number: number, time: string, toggle: boolean){
    setType(type);
    setTypeNumber(number);
    setPeriodOfTime(time); 
    setToggle(toggle);
}



useEffect(()=>{
    if(type === 'movie'){
        dispatch(fetchMainPage(_api2));
        dispatch(changeСategory('Фильмы'))
    }
    if(type === 'tv-series'){
        dispatch(fetchMainPage(_api2));
        dispatch(changeСategory('Сериалы'))
    }
    if(type === 'anime'){
        dispatch(fetchMainPage(_api2));
        dispatch(changeСategory('Аниме'))
    }
    if(type === 'cartoon'){
        dispatch(fetchMainPage(_api2));
        dispatch(changeСategory('Мультфильмы'))
    }
}, [type])


 function caterories(str: string){
    if(str === 'movie'){
       generalStatusSwitch('movie', 1, '2023', true);
    }
    if(str === 'novelties'){
         setToggle(false);
         dispatch(fetchMainPage(_api)); 
         dispatch(changeСategory('Все фильмы'));
    }
   
    if(str === 'tv-series'){
      generalStatusSwitch('tv-series', 2 , '2022-2023', true)
    }
    if(str ==='anime'){
      generalStatusSwitch('anime', 4, '2000-2023', true)
    }
    if(str ==='cartoon'){
      generalStatusSwitch('cartoon', 3, '2021-2023', true);
    }
}

   if(mainLoadingStatus === 'error'){
     return (
        <Navigate to='*'/>
  )
   } 

    return (
        <main className="main__block">
            <h1 className="main__block__title">Последние новинки кино</h1>
              <div className='main__block__navigation'>
                   <div onClick={()=> caterories('novelties')} className='main__block__punct'>Все фильмы</div>
                   <div onClick={()=> caterories('movie')} className='main__block__punct'>Фильмы</div>
                   <div onClick={()=> caterories('tv-series')} className='main__block__punct'>Сериалы</div>
                   <div onClick={()=> caterories('anime')} className='main__block__punct'>Аниме</div>
                   <div onClick={()=> caterories('cartoon')} className='main__block__punct'>Мультсериалы</div>

              </div>
              <hr />
       
             <div className="main__block__grid">
                <TransitionGroup component={null} >
               
             { mainArray.map(item =>{
                       
                      return(
                    <CSSTransition key={item.id} timeout={2000} classNames='fade'>
                                    <div  className="main__block__item">
                                        <h2 className="main__block__name">{item.name}</h2>
                                      
                                     { mainLoadingStatus === 'loading' ? <Spinner/> : <div className="main__block__img">
                                            <img src={item.poster.url !== null ? item.poster.url : ''} alt="нет картинки" />
                                        </div> }
                                      
                                        <button className='button'>
                                            <Link onClick={()=> dispatch(idForCinema(item.id))} to='/filmpage' 
                                                  style={{color: 'white', textDecoration: 'none'}}>Смотреть онлайн</Link>
                                        </button>
                                    </div>
                       </CSSTransition> 
                     
             )  }  )}

                </TransitionGroup>  
            </div>
           
           <BlockPagination nextPage={ paginationMainBlockNext} prevPage={paginationMainBlockPrev} numberPage={numberPage}/>
        </main>
    )
 }

export default MainBlock;