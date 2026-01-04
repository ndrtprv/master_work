import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/app_router/AppRouter';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { paths_data_folded, paths_data, media_paths } from './utils/constants';

function App() {

  return (
      <div className='App'>
        <BrowserRouter>
          <Header data_folded={paths_data_folded} data={paths_data} />
          <AppRouter />
          <Footer data_folded={paths_data_folded} data={paths_data} data_media={media_paths} />
        </BrowserRouter>
      </div>
  );
}

export default App;