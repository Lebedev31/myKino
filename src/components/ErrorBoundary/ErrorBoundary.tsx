
import {Component, ReactNode} from 'react';
import ErrorSVG from '../ErrorPage/ErrorPage';



class ErrorBoundary extends Component<any>{
     state ={
        error: null 
     }
     static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {

        const { error } = this.state;
         if(error){
                return(
                    <ErrorSVG/>
                )
         }
       return this.props.children;
         
    }

}

export default ErrorBoundary;