import { Container } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./component/Header/Header";
import SimpleBottomNavigation from './component/MainNav';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

function App() {
  return (
    <div>
      <Header />
      <div className='app'>
        <Container>
          <Routes>
            <Route path='/' element={<Trending />}/>
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
          </Routes>
          
        </Container>
      </div>
      <SimpleBottomNavigation />
    </div>
  );
}

export default App;
