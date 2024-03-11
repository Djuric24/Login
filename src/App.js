import React from "react";
import { useState, useEffect } from "react";

export const App = () => {
  const [page,setPage] = useState("login")
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [acess, setAcess] = useState(false);
  const [number, setNumber] = useState(0);

 const register = () => {
    let newUser = {
      username : userName,
      password : password,
      currentNumber : 0
    };
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) ?? [];
    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    // setRegistration(accountObj);
    setUserName('');
    setPassword('');
    // registeredUsers.push(accountObj);
    // izvuces sve registracije iz localst i dodas zadnju registraciju i upises
    // localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }

  const login = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"))
    console.log(registeredUsers);

    registeredUsers.forEach((user) => {
        if(user.username === userName && user.password === password) {
          setAcess(true);
          setLoggedInUser(user);
        }
    })
      setUserName('');
      setPassword('');
    }

  const logOut = () => {
    setAcess(false);
    setUserName('');
    setPassword('');
  }
  if(acess) {
    return(
      <div className="container">
        <h1> Welcome {loggedInUser.username}</h1>
        <button className="btn" onClick={logOut}>Izloguj se</button>
        <button onClick={() => setNumber(number + 1)}>+</button>
        <h1>{number}</h1>
        <button onClick={() => setNumber(number - 1)}>-</button>
        
      </div>
    ) 
  }


  const userInput = (event) => {
    let loginValue = event.target.value;
    setUserName(loginValue);
    localStorage.setItem('userName',loginValue);
    //proveri jel trebaju ova 2  lokal storidza
  }
  const passwordInput = (event) => {
    let passwordValue = event.target.value;
    setPassword(passwordValue);
    localStorage.setItem('password',passwordValue);
  }
 

  if(page === "login") {
    return (
      <div className="container">
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
       <button className="btn" onClick={() => setPage("register")} >Register</button>
    </div>
    )
  };
// Kad se refreshuje da zapamti podatke,da moze vise korisnika
// pravis novu funckiju koja na svaki pritisak dugmeta upisuje novu vrednost za broj u localstorrage
// useEfect(() => {
    // kad se klikne na dugme da upise u localstorage
// },[number])  
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

      <button className="button" onClick={() => {
        register()
        setPage("login")
        }}> Register </button>
    </div>
  )

}

export default App;