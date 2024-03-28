import axios from "axios";
import React from "react";
import './index.css'; 
import { useState, useEffect } from "react";
export const App = () => {
  const apiUrl = "http://localhost:5000"
  const [page,setPage] = useState("login");
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({});
  const [acess, setAcess] = useState(false);
  const [number, setNumber] = useState(0);
  const [city, setCity] = useState('');
  const [editCity, setEditCity] = useState(false);
  
 const updateCity = (event) => {
    let newCity = event.target.value;
    setCity(newCity);
  } 
  const userInput = (event) => {
    let loginValue = event.target.value;
    setUserName(loginValue);
  }
  const passwordInput = (event) => {
    let passwordValue = event.target.value;
    setPassword(passwordValue);
  }
// - update city kao i number, salje city kao deo objekta
// - dugme da se napravi za reset city.  update da radi, ali da salje undefined.
// - dugme style da se inplementira
// - input style isto da se implementira


useEffect(() => {
  if(loggedInUser.id && loggedInUser.number !== number) {
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
    // console.log(res?.data)
    setUserName('');
    setPassword('');
    setPage('login'); //proslo 
    //zadatak da proveri da li je uspesan register i tek onda da prebaci na log
  }
const updateUserOnBackend = async () => {
  const updatedUser = {
    id : loggedInUser.id,
    number : number ?? loggedInUser.number,
    city : city ?? loggedInUser.city
  }
  let res = await axios.put(apiUrl+"/updatedata",updatedUser);
  let noveVrednostiSaServera = res.data
  console.log(noveVrednostiSaServera)
  setLoggedInUser({...noveVrednostiSaServera});

}
  const login =async () => {
    const user = {
      username : userName,
      password : password
    }  
    let res = await axios.post(apiUrl+"/login",user);
    let odgovorSaServera = res.data
    if(odgovorSaServera.id) {
      
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

  if(acess) {
    
      return(
        <div className="container">
          <h1> Welcome   {loggedInUser?.username}</h1>
          <h2>{loggedInUser?.city}</h2>
          {/* {!loggedInUser.city && <div>
             <label htmlFor="">Unesi grad</label>
          <input type="text" />
            </div>} */}
          <button className="button-primary" onClick={() => {
            if(editCity === true) {
              setEditCity(false);
            } if(editCity === false) {
              setEditCity(true);
            }
            // setEditCity((proslaVrednost) => !proslaVrednost)
          }}>Izmeni grad</button>
          {editCity === true && <>
          <input type="text" className="input" onChange={updateCity}/>
          <button className="button-succes" onClick={() => {updateUserOnBackend()}}>Primeni</button>
          </> }
          
            
          <button className="operation" onClick={() => {
            setNumber(number + 1);
            }}>+</button>
          <h1>{number}</h1>
          <button className="operation" onClick={() => setNumber(number - 1)}>-</button>
          <button className="button-danger" onClick={logOut}>Izloguj se</button>
          
        </div>
    ) 
    
  }

 
 

  if(page === "login") {
    //napraviti dugme da ako nezelim da se registruje da me vrati na login
    return (
      <div className="container">
       <h3>Molim ulogujte se</h3>
       {/* <div className="form-group">
          <label htmlFor="">Korisnicko ime:  </label>
          <input type="text" value={userName} onChange={userInput}></input>
       </div> */}
        <label htmlFor="username">Unesite vase ime:  </label>
        <input type="text" value={userName} onChange={userInput} className="input"></input>
        <label htmlFor="password">Unesite vasu lozinku:  </label> 
        <input type="password" value={password} onChange={passwordInput} className="input"></input>
       {/* <div className="form-group" >
          <label htmlFor="">Lozinka:  </label>
          <input type="password" className="password-input" value={password} onChange={passwordInput}></input>
       </div> */}
       <button className="button-primary" onClick={login}> Login </button>
       <button className="button-succes" onClick={() => setPage("register")} >Register</button>
    </div>
    )
  };
if(page === "register"){
return (
    <div className="container">
       <div className="form-group" >
        <h1>Dobro dosli, molim registrujte se </h1>
        <label htmlFor="username">Unesite vase ime:  </label>
        <input type="text" value={userName} onChange={userInput} className="input"></input>
        {/* <input type="text" value={userName} onChange={userInput} /> */}
        </div>
       <div className="form-group" >
        <label htmlFor="password">Unesite vasu lozinku:  </label>
        {/* <input type="password" className="password-input" value={password} onChange={passwordInput} /> */}
        <input type="password" value={password} onChange={passwordInput} className="input"></input>
      </div>
      <button className="button-succes" onClick={() => {
        register()
        }}> Register </button>
        <button className="button-danger" onClick={() => {setPage("login")}}>Back to login</button>
    </div>
  )
}

}

export default App;