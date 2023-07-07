import '../FilmList/FilmList.scss';
import { useSelector} from 'react-redux';
import '../../style/button.scss'
import BlockPagination from '../BlockPagination/BlockPagination';
import { HeaderInfoSelector } from '../../features/headerSlice/headerSliceInterface';
import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import FilmBlock from '../FilmBlock/FilmBlock';



function FilmList(){

    const filmListArray = useSelector((state: HeaderInfoSelector)=> state.headerSearch.headerData);
    const loadedFilmList = useSelector((state: HeaderInfoSelector)=> state.headerSearch.headerLoader);
    const [numberPage, setNumberPage] = useState(1);
    const [leftOperand, setLeftOperand] = useState(0);
    const [rightOperand, setRightOperand] = useState(10);
  
    useEffect(()=>{
        setNumberPage(1);
        setLeftOperand(0);
        setRightOperand(10);
    }, [filmListArray])

    const totalPages = Math.ceil(filmListArray.length / 10); 

   function nextPagination() {
  
    if (rightOperand < filmListArray.length && numberPage < totalPages) {
      setLeftOperand(leftOperand + 10);
      setRightOperand(rightOperand + 10);
      setNumberPage(numberPage + 1);
    }
  }

  function prevPagination() {
    if (numberPage > 1 && leftOperand > 0) {
      setNumberPage(numberPage - 1);
      setLeftOperand(leftOperand - 10);
      setRightOperand(rightOperand - 10);
    }
  }

    const tenArray = filmListArray.length > 0 ? filmListArray.slice(leftOperand, rightOperand): filmListArray;
    const loaded = loadedFilmList === 'loading' ? <div style={{width: '1000px', margin: '0 auto'}}><Spinner/></div>: null;
    
    return(
        
        <div className='filmList'>
                <Link to='/' style={{textDecoration: 'none', cursor: 'pointer', fontSize: '25px'}}>Перейти на главную</Link>

          <div className='filmList__grid'>
         
            {loaded}
            {tenArray.length > 0 ? tenArray.map(item =>{
                return(
                    <FilmBlock key={item.kinopoisk_id} id={item.kinopoisk_id} name={item.name_russian} description={item.description} poster={item.big_poster}/> 
                )
            }): <h2 >НЕТ РЕЗУЛЬТАТОВ</h2>
            }

        </div>
        <div  style={{margin: '10px auto', fontSize: '28px', width: '500px', textAlign: 'center'}} >{`${filmListArray.length} найденных результатов`}</div>
        <div> <BlockPagination prevPage={prevPagination} nextPage={nextPagination} numberPage={numberPage}/> </div>
         
        </div>
    )

}

export default FilmList;