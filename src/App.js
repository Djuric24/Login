import React from "react";
import { useState, useEffect } from "react";

export const App = () => {
  const [page,setPage] = useState("login")
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [acess, setAcess] = useState(false);
  const [number, setNumber] = useState(() => {
    const storedNumber = localStorage.getItem('number');
    return storedNumber ? parseInt(storedNumber, 10) : 0;
  } );

 
//   useEffect(() => {
//   // Pratimo promene number i ažuriramo lokalno skladište
//   const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) ?? [];
//   const updatedUsers = storedUsers.map(user => {
//     if (user.username === loggedInUser.username) {
//       return {
//         ...user,
//         currentNumber: number
//       };
//     }
//     return user;
//   });

//   localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
// }, [number, loggedInUser]);
useEffect(() => {
  const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const loggedInUser = storedUsers.find(user => user.username === userName);

  if (loggedInUser) {
    setNumber(loggedInUser.currentNumber || 0);
  } else {
    // Postavi vrednost number na 0 ako trenutni korisnik nije pronađen u lokalnom skladištu
    setNumber(0);
  }
}, [userName]);




 const register = () => {
  if(!userName || !password) {
    alert('Molim unesite Vase korisnicko ime i lozinku');
    return;
  }
  //ako nije ispunjeno da neupisuje nista u bazu
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
  }

  const login = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"))
    let found = false
    console.log(registeredUsers);

    registeredUsers.forEach((user) => {
        if(user.username === userName && user.password === password) {
          setAcess(true);
          found = true
          setLoggedInUser(user);
          setUserName('');
          setPassword('');
        }
    })
    if(found === false) {
      alert("nije dobro")
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
        <h1> Welcome   {loggedInUser.username}</h1>
        <button onClick={() => {
          setNumber(number + 1);
          console.log('POvecano na:', number + 1);
          }}>+</button>
        <h1>{number}</h1>
        <button onClick={() => setNumber(number - 1)}>-</button>
        <button className="btn" onClick={logOut}>Izloguj se</button>
        
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