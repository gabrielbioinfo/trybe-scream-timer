import logo from './logo.png';
import './App.css';
import scream from './scream.mp3';
import { useState, useEffect } from 'react';

const PLAYERS = [
  '#CantaMuca',
  'Gabriel',
  'Jensen&Jensen',
  'Moksés',
  'Rita',
  'Isaac Back',
  'Isadora Back',
  'Tribo A',
  'Tribo B',
];

const TIMER = 30;

function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isPlaying, setIsPlaying] = useState('');
  const [availablePlayers, setAvailablePlayers] = useState(PLAYERS);

  const getRandomPlayer = () => {
    const randomPlayer =
      availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    setAvailablePlayers(
      availablePlayers.filter((player) => player !== randomPlayer)
    );
    setIsPlaying(randomPlayer);

    if (availablePlayers.length === 1) {
      setAvailablePlayers(PLAYERS);
    }

    return randomPlayer;
  };

  useEffect(() => {
    if (!startTimer) return;
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTimer]);

  useEffect(() => {
    if (seconds % TIMER === 1) {
      const audio = new Audio(scream);
      audio.play();
      // if(availablePlayers.length)
      getRandomPlayer();
    }
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((minutes) => minutes + 1);
    }
  }, [seconds]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ position: 'relative' }}>
          <img width={200} src={logo} alt="logo" />
          <h1>
            {isPlaying}
          </h1>
        </div>
        <span>
          {`${minutes}`.padStart(2, '0')}:{`${seconds}`.padStart(2, '0')}
        </span>
        <button onClick={() => setStartTimer(true)}>Iniciar</button>
      </header>
    </div>
  );
}

export default App;
