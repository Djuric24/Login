import React from "react";
import { useState, useEffect } from "react";
//umesto slike kad se ulogujem da bude counter , - broj +
//i na klik minus i plus da radi minus i plus 1 na pocetni broj
//da pamti za svakog korisnika koji je trenutni broj i kad se ulogujes da vrati na pocetni broj tog korisnika
//i da sifra kad se logujem nepokaze koju kucam     x
export const App = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [registration, setRegistration] = useState({});
  const [acess, setAcess] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedPassword = localStorage.getItem('password');
    const storedRegistration = localStorage.getItem('registration');

    if(storedUserName) {
      setUserName(storedUserName);
    }
    if(storedPassword) {
      setPassword(storedPassword);
    }
    if(storedRegistration) {
      setRegistration(JSON.parse(storedRegistration));
    }
  }, []);

  const login = () => {
    if(registration.username === userName && registration.password === password) {
      setAcess(true);
       localStorage.setItem('loggedInUser', JSON.stringify(registration));
    } else if (registration.username === userName || registration.password === password) {
      alert('niste uneli odgovaraje korisnicko ime ili lozinku');
      setUserName('');
      setPassword('');
    }
  }
  const numberChange = () => {
    
  }
  const logOut = () => {
    setAcess(false);
    setUserName('');
    setPassword('');
  }
  if(acess) {
    return(
      <div className="container">
        <h1>Odobren vam je pristup</h1>
        <button className="btn" onClick={logOut}>Izloguj se</button>
        <button>+</button>
        <input type="text" onChange={numberChange} />
        <button>-</button>
      </div>
    )
  }
  const handleButtonDelete = () => {
    setRegistration({});
    setUserName('');
    setPassword('');
    return
  }

  const userInput = (event) => {
    let loginValue = event.target.value;
    setUserName(loginValue);
    localStorage.setItem('userName',loginValue);
  }
  const passwordInput = (event) => {
    let passwordValue = event.target.value;
    setPassword(passwordValue);
    localStorage.setItem('password',passwordValue);
  }
  const register = () => {
    let accountObj = {
      username : userName,
      password : password,
      // currentNumber : 0
    };
    setRegistration(accountObj);
    setUserName('');
    setPassword('');
    localStorage.setItem('registration', JSON.stringify(accountObj));
    // console.log(registration);
    // 
  }

  if(registration.username && registration.password) {
    return (
      <div className="container">
       <h1>Cestitam. Uspesno ste se registrovali!</h1>
       <h3>Molim ulogujte se</h3>
       <div className="form-group">
          <label htmlFor="">Korisnicko ime:  </label>
          <input type="text" value={userName} onChange={userInput}></input>
       </div>
       <div className="form-group" >
          <label htmlFor="">Lozinka:  </label>
          <input type="password" className="password-input" value={password} onChange={passwordInput}></input>
       </div>
       <button className="button" onClick={login}> Login </button>
       <button className="btn" onClick={handleButtonDelete} >Register</button>
    </div>
    )
  };

  return (
    <div className="container">
       <div className="form-group" >
        <h1>Dobro dosli, molim registrujte se </h1>
        <label htmlFor="username">Unesite vase ime:  </label>
        <input type="text" value={userName} onChange={userInput} />
        </div>
       <div className="form-group" >
        <label htmlFor="password">Unesite vasu lozinku:  </label>
        <input type="password" className="password-input" value={password} onChange={passwordInput} />
      </div>
      <button className="button" onClick={register}> Register </button>
    </div>
  )

}

export default App;