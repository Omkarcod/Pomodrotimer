import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signupage from './Component/Signupage/Signupage';
import Loginpage from './Component/Loginpage/Loginpage';

import { useEffect, useState } from 'react';
import { auth } from './firebase';
import PmodoTimer from './Component/PmodoTimer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/'
            element={user ? <PmodoTimer /> : <Navigate to="/login" />}
          />
          <Route path='/signup' element={<Signupage />} />
          <Route path='/login' element={<Loginpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;













