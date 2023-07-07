import Header from '../Header/Header';
import MainSlider from '../MainSlider/MainSlider';
import MainBlock from '../MainBlock/MainBlock';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';



function MainPage(){
    return(
     <>
   <ErrorBoundary>  
        <Header/>
   </ErrorBoundary>  
     
    <ErrorBoundary>
        <MainSlider/>
    </ErrorBoundary> 
    
    <ErrorBoundary>
        <MainBlock/>
    </ErrorBoundary>
    
     </>
    )

}

export default MainPage;