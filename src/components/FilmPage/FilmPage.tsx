import '../FilmPage/FilmPage.scss';
import Header from '../Header/Header';
import myImage from '../../icons/free-icon-imdb-5968612.png';
import Star from '../Star/Star';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';
import { MainBlockSelector } from '../../features/mainPage/mainPageInterface';
import services from '../../services/services';
import Spinner from '../Spinner/Spinner';
import { KinoBdLoading, TransformKinoLoading} from '../../services/servicesInterface';


interface Reviews {
    filmId: number;
    text: {descrition: string, data: string}[],
    star: number[];
    klientToggle: boolean;
    starToggle: boolean;
}


function FilmPage() {
    const {request2} = services();
    const [infoObject, setInfoObject] = useState<TransformKinoLoading>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [starRaiting, setStarRaiting] = useState(0);
    const [areaValue, setAreaValue] = useState('');
    const [arrayDataText, setArrayDataText] = useState<{descrition: string, data: string}[]>([]);
    
     const mainId = useSelector((state: MainBlockSelector)=> state.mainBlock.id); // ид, которое будет передаваться на страницу просмотра фильма онлайн
     const caterories = useSelector((state: MainBlockSelector)=> state.mainBlock.caterories);
   
     const saveId = localStorage.getItem('mainId');
   
    const reviews: Reviews = {
        filmId: mainId,
        text: [],
        star: [],
        klientToggle: true,
        starToggle: true
    }

    useEffect(() => {

        if(saveId){

            setLoading(true);
            setError(false);
            window.scrollTo(0, 0); // Прокрутить страницу вверх при монтировании компонента
            request2(`https://kinobd.net/api/films/search/kp_id?q=${saveId}`)
            .then((result: KinoBdLoading): void =>{
                setInfoObject(result.data[0]);
                setLoading(false);
            })
            .catch((e)=>{
                setLoading(false);
                console.log(`ой кажется ошибочка вышла ${e}`);
                setError(true);
            })
        }

      
    }, [saveId]);


    useEffect(()=>{
        if(!localStorage.getItem(mainId.toString())){
            const key = JSON.stringify({...reviews});
            localStorage.setItem(mainId.toString(), key);
        }
    }, [mainId]);
    
    useEffect(()=>{
        const res = localStorage.getItem(mainId.toString());
       
        if(res){
            const obj: Reviews = JSON.parse(res);
            const z = obj.star.length > 0 ? obj.star.reduce((a,b)=> a + b): obj.star.length;
            if(z){
                setStarRaiting(Math.ceil(z / obj.star.length + 1));
            }

            if(obj.text.length > 0){
                setArrayDataText(obj.text);
            }
        }

    }, [mainId])

    function star(index: number){
        const res = localStorage.getItem(mainId.toString());
        if(res){
            const parseObj: Reviews = JSON.parse(res);
            if(parseObj.starToggle){
               
                parseObj.star.push(index + 1);
                parseObj.starToggle = false;
                const string = JSON.stringify(parseObj);
                localStorage.setItem(mainId.toString(), string);
            } else{
                alert('Вы уже ставили оценку для этого фильма')
            }
        }
    }

    function text(str: string){
        const res = localStorage.getItem(mainId.toString()) as string;
        const parse: Reviews = JSON.parse(res);

        if(parse.klientToggle){

            if(str.length > 0){
                const formattedDate: string = new Date().toISOString().slice(0, 10);
                parse.text.push({descrition: str, data: formattedDate});
                parse.klientToggle = false;
                setArrayDataText(parse.text);
                localStorage.setItem(mainId.toString(), JSON.stringify(parse));
            }

        } else{
            alert('Вы уже оставляли отзыв на этот фильм');
        }
      
    }


    if(loading === true){
        return <div><Spinner/></div>
    }

    if(error === true){
        return <h1>Ой, кажется ошибочка вышла</h1>
    }
     
     
        return ( 
        <section className='filmPage'>
            <Header/>
            <div className='filmPage__navigation'>
                <Link to='/'>Перейти на главную </Link>
                <Link to='/'>{caterories}</Link>
                <Link to='/filmList'>Найденные результаты</Link>
            </div>
            
            <div className='filmPage__bigMain'>
           
            <div className='filmPage__main'>
                <div className='filmPage__poster'>
                    <img src={infoObject?.big_poster} alt="постер" />
                </div>
                <div className='filmPage__textInfo'>
                    <h3 className='filmPage__title'>{infoObject?.name_russian}</h3>
                    <div className='filmPage__description'>
                        {infoObject?.description}
                    </div>
                    <div className='filmPage__info'>
                        
                        <p> <strong>Режиссер:</strong>
                        {' '}  {infoObject?.persons?.filter(item => item.profession.profession_id === 'director').map(item => (
                                <span key={item.name_russian}>{item.name_russian + ' '}</span>
                                 ))}
                        {infoObject?.persons?.every(item => item.profession.profession_id !== 'director') && (
                            <span>нет информации</span>
                         )}
                        </p>
                        
                        <p> <strong>В ролях:</strong>
                        {' '}  {infoObject?.persons?.filter(item => item.profession.profession_id === 'actor').map(item => (
                                <span key={item.name_russian}>{item.name_russian + ' '}</span>
                                 ))}
                        {infoObject?.persons?.every(item => item.profession.profession_id !== 'actor') && (
                            <span>нет информации</span>
                         )}
                        </p>
                       
                        <p> <strong>Продюсер:</strong>
                        {' '}  {infoObject?.persons?.filter(item => item.profession.profession_id === 'producer').map(item => (
                                <span key={item.name_russian}>{item.name_russian + ' '}</span>
                                 ))}
                        {infoObject?.persons?.every(item => item.profession.profession_id !== 'producer') && (
                            <span>нет информации</span>
                         )}
                        
                         </p>
                       
                        <p> <strong>Жанр:</strong> {infoObject?.genres.map(item => item.name_ru + '   ' )}  </p>
                        <p> <strong>Год:</strong> {infoObject?.year}</p>
                        <p> <strong>Страна:</strong> {infoObject?.countries.map(item=> item.name_ru + '   ')}</p>
                    </div>
                </div>
            </div>

            <aside className='filmPage__comment'>
                <div className='filmPage__commentBlock'>
                    <textarea 
                        className='filmPage__textArea'   
                        placeholder='Напишите отзыв к фильму'
                        onChange={(e)=> setAreaValue(e.target.value) }>
                        </textarea>
                    <button onClick={()=> text(areaValue)} className='filmPage__request'>Отправить</button>
                </div>
                <hr />
                <div className='filmPage__reviews'>
                      {arrayDataText.length > 0 ? arrayDataText.map((item, index)=>{
                            return (
                                <div key={index} style={{width: '350px', fontSize: '14px', borderBottom: '2px solid black'}}>
                                    <div>{item.data}</div>
                                    <p style={{width: '350px', wordWrap: 'break-word'}}>{item.descrition}</p>
                                </div>
                            )
                      }): null }
                </div>
            </aside>
          
            </div>
        
           
            <div className='filmPage__rating'>
                <div className='filmPage__block'>
                    <div className='filmPage__kinopoisk'>
                        <div className='filmPage__rating__img'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
                                <rect width="100%" height="100%" fill="#FFA500" />
                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000000" fontSize="13" fontFamily="Arial">КиноПоиск</text>
                            </svg>
                        </div>
                        <div className='filmPage__rating__description'>{infoObject?.rating_kp}</div>
                      
                    </div>

                    <div className='filmPage__kinopoisk'>
                        <div className='filmPage__rating__img'>
                            <img src={myImage} alt="картинка" />
                        </div>
                        <div className='filmPage__rating__description'>{infoObject?.rating_imdb}</div>
                    </div>
                </div>

                <div className='filmPage__star'>
                    { Array.from({ length: 10 },(_, index) => {

                        if(index + 1 < starRaiting){
                            return(
                                <div key={index} onClick={()=>star(index)}className='filmPage__starHover'><Star starToggle={true}/></div> 
                           )
                        }  
                        else {
                           
                            return (
                                <div key={index} onClick={()=>star(index)}className='filmPage__starHover'><Star starToggle={false}/></div> 
                            )
                        }
                            
                    })}
               </div>
  
        </div>
   </section>
   
   )

}

export default FilmPage;