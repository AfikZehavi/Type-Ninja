import './assets/main.scss'
import StringDisplay from './components/StringDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {



  return (
    <div className="App d-flex flex-column">
      <Header />
      <div className="test-container">
        <StringDisplay />
      </div>
      <Footer />
    </div>
  );
}

export default App;
