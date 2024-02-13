import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const App = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // const [userNameLogin, setUserNameLogin] = useState('');
  // const [passwordLogin, setPasswordLogin] = useState('');
  const [registration, setRegistration] = useState({});
  const [acess, setAcess] = useState(false);

  const login = () => {
    if(registration.username === userName && registration.password === password) {
      setAcess(true);
      return (
        <div>
          <h1>Ulogovali ste se!</h1>
        </div>
      )
    } else if (registration.username === userName || registration.password === password) {
      alert('niste uneli odgovaraje korisnicko ime ili lozinku');
      setUserName('');
      setPassword('');
    }
  }
  const logOut = () => {
    setAcess(false);
    setUserName('');
    setPassword('');
  }
  if(acess) {
    return(
      <div className="container">
        Usli ste tamo gde niko do sada nije!
        <button className="btn" onClick={logOut}>Izloguj se</button>
      </div>
    )
  }
  const handleButtonDelete = () => {
    setUserName('');
    setPassword('');
    return(
      <div>
// kako da vratim na registraciju?
      </div>
    )
  }

  const userInput = (event) => {
    let loginValue = event.target.value;
    setUserName(loginValue);
  }
  const passwordInput = (event) => {
    let passwordValue = event.target.value;
    setPassword(passwordValue);
  }
  const register = () => {
    let accountObj = {
      username : userName,
      password : password
    };
    setRegistration(accountObj);
    setUserName('');
    setPassword('');
    console.log(registration);
  }
  //zasto ovo ne ide u regiser iznad nego ide zasebno?
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
          <input type="text" value={password} onChange={passwordInput}></input>
       </div>
       <button className="button" onClick={login}>Login</button>
       <button className="btn" onClick={handleButtonDelete} >Obrisi moj nalog</button>
    </div>
    )
  };
  

  return (
    <div className="container">
       <div className="form-group" >
        <h1>Dobro dosli, molim registrujte se</h1>
        <label htmlFor="username">Unesite vase ime:  </label>
        <input type="text" value={userName} onChange={userInput} />
        </div>
       <div className="form-group" >
        <label htmlFor="password">Unesite vasu lozinku:  </label>
        <input type="text" value={password} onChange={passwordInput} />
      </div>
      <button className="button" onClick={register}>Register</button>
    </div>
  )

}

export default App;