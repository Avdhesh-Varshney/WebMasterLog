
import DataProvider from './context/DataProvider';
import './App.css';
import Home from './Components/Home';

function App() {
  return (
    <>
      <DataProvider>
        {/* children */}
        <Home /> 
      </DataProvider>
    </> 
  );
}

export default App;
