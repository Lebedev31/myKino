import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/style/normalize.scss';
import App from './components/App/App';
import store from './features/store/store';
import {Provider} from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 
<Provider store={store}>

     <React.StrictMode>
         <App/>
    </React.StrictMode>

</Provider>
  

 
     
  
);


