import '../FilmListYearJenres/FilmListYearJenres.scss';
import { useSelector, useDispatch} from 'react-redux';
import { AppDispatch } from '../../features/store/store';
import '../../style/button.scss'
import BlockPagination from '../BlockPagination/BlockPagination';
import { JenresHeader } from '../../features/jenresHeaderSlice/jenresheaderSliceInterface';
import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import FilmBlock from '../FilmBlock/FilmBlock';
import { countPage} from '../../features/jenresHeaderSlice/jenresHeaderSlice';
import services from '../../services/services';
import { PremieresMain } from '../../features/premiere/premieresInterface';



export interface JenresInfo{
    jenres: JenresHeader
 }

function FilmListYearJenres(){

const{transformObject} = services();
 
const dispatch: AppDispatch = useDispatch();

 const jenresArray = useSelector((state: JenresInfo)=> state.jenres.jenresData);
 const jenresLoaded = useSelector ((state: JenresInfo)=> state.jenres.jenresLoading);
 const pages = useSelector((state: JenresInfo)=> state.jenres.pages);
 const total = useSelector((state: JenresInfo)=> state.jenres.total);
 const url = useSelector((state: JenresInfo)=> state.jenres.url);
 const page = useSelector((state: JenresInfo)=> state.jenres.page);

const [numberPage, setNumberPage] = useState(1);
const [leftOperand, setLeftOperand] = useState(0);
const [rightOperand, setRightOperand] = useState(10);
const [dinamicUrl, setDinamikUrl] = useState(url);
const [requestResult, setRequestResult] = useState<PremieresMain[]>([]);


    useEffect(()=>{
        setNumberPage(1);
        setLeftOperand(0);
        setRightOperand(10);
    }, [jenresArray])
   
    const prevArray = [...jenresArray, ...requestResult];
    const totalPages = Math.ceil(prevArray.length / 10); 
   
   function nextPagination() {
  
    if (rightOperand < prevArray.length && numberPage < totalPages) {
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
  
    const tenArray = prevArray.length > 0 ? prevArray.slice(leftOperand, rightOperand): prevArray;
    const loaded = jenresLoaded === 'loading' ? <div style={{width: '1000px', margin: '0 auto'}}><Spinner/></div>: null;
   useEffect(()=>{
    if(jenresArray.length === 50 && numberPage === totalPages && page <= pages){
        dispatch(countPage(page));
        const regex: RegExp = /page=(\d+)/;
        const match = url.match(regex);
        if (match) {
            const currentPage = parseInt(match[1], 10);
            const nextPage = currentPage + page;
            const newUrl = url.replace(regex, `page=${nextPage}`);
            setDinamikUrl(newUrl);
          }
    }
 
   }, [numberPage]);

 useEffect(()=>{
    if(dinamicUrl.length > 0){
        const result = transformObject(dinamicUrl);
        const res = result.then(resi => {
           setRequestResult(requestResult.concat(resi));
        }); 
    }


 },[dinamicUrl] )
    
    return(
         
        <div className='filmListYearJenres'>
                <Link to='/' style={{textDecoration: 'none', cursor: 'pointer', fontSize: '25px'}}>Перейти на главную</Link>

          <div className='filmListYearJenres__grid'>
          {loaded}
            {jenresArray.length > 0 ? tenArray.map(item =>{
                return(
                    <FilmBlock key={item.id} id={item.id} name={item.name}  poster={item.poster?.url} description={item?.description}/> 
                )
            }): <h2 >НЕТ РЕЗУЛЬТАТОВ</h2>
            }
           
        </div>
        <div  style={{margin: '10px auto', fontSize: '28px', width: '500px', textAlign: 'center'}} >{`${total} найденных результатов`}</div>
        <div> <BlockPagination prevPage={prevPagination} nextPage={nextPagination} numberPage={numberPage}/> </div>
         
        </div>
    )

}

export default FilmListYearJenres;