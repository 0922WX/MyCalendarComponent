import dayjs from 'dayjs';
import Calendar from './Calendar';
import Header from './Calendar/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Calendar value={dayjs('2024-8-3')}/>
    </div>
  );
}

export default App;