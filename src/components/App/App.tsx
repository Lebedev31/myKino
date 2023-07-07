import '../../style/container.scss';
import '../App/App.scss';
import FilmPage from '../FilmPage/FilmPage';
import MainPage from '../MainPage/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorSVG from '../ErrorPage/ErrorPage';
import FilmList from '../FilmList/FilmList';
import FilmListYearJenres from '../FilmListYearJenres/FilmListYearJenres';

function App() {
   return (
      <BrowserRouter>
      
      <div className='app'>
         <div className='container'>
         <Routes>
            
            <Route path='/' element={ <MainPage/>}/>

            <Route path='/filmpage' element={ <FilmPage/>}/> 
            <Route path='*' element={<ErrorSVG/>}/>
            <Route path='/filmList' element={<FilmList/>}/>
            <Route path='/filmListJenres' element={<FilmListYearJenres/>}/>
                 
         </Routes>
         </div>
      </div>
      </BrowserRouter>
   )

}

export default App;