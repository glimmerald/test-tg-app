import { useEffect } from 'react';
import Header from './components/Header/Header';
import { useTelegram } from './Hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Button from './components/Button/Button';


function App() {

  const { onToggleButton, tg } = useTelegram();


  useEffect(() => {
    tg.ready();
  }, [])


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path='/form' element={<Form />} />
      </Routes>
      <Button onClick={onToggleButton}>toggle</Button>
    </div>
  );
}

export default App;
