import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
export const App = () => {
  const apiUrl = "http://localhost:3333"
  const [page,setPage] = useState("login")
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [acess, setAcess] = useState(false);
  const [number, setNumber] = useState(0);

useEffect(() => {
  console.log(number);
  if(loggedInUser.id) {
    updateUserOnBackend()
}
},[number])

 const register =async () => {
  if(!userName || !password) {
    alert('Molim unesite Vase korisnicko ime i lozinku');
    return; //ovaj return ne radi
  }
  //ako nije ispunjeno da neupisuje nista u bazu
    let newUser = {
      username : userName,
      password : password,
      number : 0
    };
    let res = await axios.post(apiUrl+"/savedata",newUser)
    console.log(res?.data)
    setUserName('');
    setPassword('');
    setPage('login'); //proslo
    //zadatak da proveri da li je uspesan register i tek onda da prebaci na log
  }
const updateUserOnBackend = async () => {
  const updatedUser = {
    id : loggedInUser.id,
    number : number
  }
  let res = await axios.put(apiUrl+"/updatedata",updatedUser);
}
  const login =async () => {
    const user = {
      username : userName,
      password : password
    }  
    let res = await axios.post(apiUrl+"/login",user);
    let odgovorSaServera = res.data
    if(odgovorSaServera.id) {
      if(!odgovorSaServera.city) {
        alert('nemas grad! ');
      }
      setLoggedInUser(odgovorSaServera);
      setNumber(odgovorSaServera.number);
      setAcess(true);
    }
    else if(!odgovorSaServera.id) {
      alert(odgovorSaServera.message);

    }
  }

  const logOut = () => {
    setAcess(false);
    setUserName('');
    setPassword('');
  }
  // ako nepostoji grad, ispod welcome da pise input sa labelom unesi grad
  if(acess) {
    if(!odgovorSaServera.city) {
      return (
        <div className="container">
          <h1> Welcome   {loggedInUser?.username}</h1>
          <label htmlFor="">Unesi grad</label>
          <input type="text" />
          
          <button className="operation" onClick={() => {
            setNumber(number + 1);
            console.log('POvecano na:', number + 1);
            }}>+</button>
          <h1>{number}</h1>
          <button className="operation" onClick={() => setNumber(number - 1)}>-</button>
          <button className="btn" onClick={logOut}>Izloguj se</button>
          
        </div>
      )
    } else {
   
      return(
      
        <div className="container">
          <h1> Welcome   {loggedInUser?.username}</h1>
          
          <button className="operation" onClick={() => {
            setNumber(number + 1);
            console.log('POvecano na:', number + 1);
            }}>+</button>
          <h1>{number}</h1>
          <button className="operation" onClick={() => setNumber(number - 1)}>-</button>
          <button className="btn" onClick={logOut}>Izloguj se</button>
          
        </div>
    ) 
    }
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