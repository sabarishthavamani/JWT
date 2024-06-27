import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Welcome from './Components/Welcome';
import Tablecoloum from './Components/Tablecoloum';
import Edit from './Components/Edit';

function App() {


  return (
    <>
      <header>
        <Header />
        {/* <Navbar/> */}
      </header>
      <main>
        <Routes>
          <Route path="/Welcome" element={<Welcome />} exact />
          <Route path="/SignUp" element={<SignUp />} exact />
          <Route path="/Tablecoloum" element={<Tablecoloum />} exact />
          <Route path="/Login" element={<Login />} exact />
          <Route path="/Edit/:id" element={<Edit />} exact />
        </Routes>
      </main>
    </>
  );
}

export default App;
