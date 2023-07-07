import '../FilmBlock/FilmBlock.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store/store';
import { idForCinema } from '../../features/mainPage/mainPageSlice';
import { Link } from 'react-router-dom';

interface FilmBlockProps{
    id: number,
    name: string,
    poster: string,
    description: string | undefined,
}

function FilmBlock({id, name, poster, description}: FilmBlockProps){

    const dispatch:AppDispatch = useDispatch();

    return(
        <div key={id} className='filmList__item'>
        <div className='filmList__img'>
            <img src={poster} alt="постер" />
        </div>

        <div className='filmList__descr'>
            <h3 className='filmList__title'>{name}</h3>
            <p className='filmList__info'>{description}</p>
            
            <button className='button' style={{position: 'absolute', bottom: '25px', right: '60px'}}>
                            <Link onClick={()=> dispatch(idForCinema(id))} to='/filmpage' 
                                  style={{color: 'white', textDecoration: 'none'}}>Смотреть онлайн</Link>
           </button>

        </div>
    </div>

    )



}

export default FilmBlock;