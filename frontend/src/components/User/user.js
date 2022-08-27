import axios from "axios";
import React from "react";
import { baseURL } from "../../App";
import RatingContext from "../RatingContext";

function User() {

    const [username, setUsername] = React.useState('');
    const [error, setError] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [counter, setCounter] = React.useState(0);
    const [registerForm, setRegisterForm] = React.useState({
        view: false,
        username: '',
        email: '',
        password: ''
         });
    const [loginForm, setLoginForm] = React.useState({
       view: false,
       email: '',
       password: ''
        });
    const ratingContext = React.useContext(RatingContext);

    React.useEffect(() => {
        if(ratingContext.userID > 0){
            fetchBook();
        };
    }, [ratingContext]);

    const fetchBook = () => {
        axios.get(baseURL + 'user/'+ratingContext.userID, {
            email: email,
            }).then((res) => {
                console.log(res)
            setUsername(res.data.data.username);
            setCounter(res.data.data.rating_count);
        }).catch(error=> console.error(error));
    };

    const handleMore = () => {
        ratingContext.toggleAction('user', ratingContext.userID)
    }

    const handleRegister = () => {
        setRegisterForm({...registerForm, ['view']: true});
        handleLoginClose();
    }
    const handleRegisterClose = () => setRegisterForm({...registerForm, ['view']: false});
    const changeRegisterHandler = e => setRegisterForm({...registerForm, [e.target.name]: e.target.value});

    const handleLogin = () => {
        setLoginForm({...loginForm, ['view']: true});
        handleRegisterClose();
    }
    const handleLoginClose = () => setLoginForm({...loginForm, ['view']: false});
    const changeLoginHandler = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});

    const handleRegisterSubmit = () => {
    
        axios.post(baseURL + 'user/register/', {
            username: registerForm.username,
            email: registerForm.email,
            password: registerForm.password
            }).then(res => {
                if(res.data.status!=200){
                    setError('Nieprawidłowe dane');
                    throw new Error("Error");
                }else if(res.data.status===409){
                    setError('Adres email jest zajęty');
                    throw new Error("Error");
                }else{
                    setError('');
                }
            }).catch(error=> console.error(error));
            handleRegisterClose();
    }

    const handleLoginSubmit = () => {
    
        axios.post(baseURL + 'user/login', {
            email: loginForm.email,
            password: loginForm.password
            }).then((res) => {
                if(res.data.status==200){
                    ratingContext.toggleUser(res.data.data.userID);
                    setEmail(loginForm.email);
                    setError('');
                    console.log("log in");
                }
                else{
                    setError('Nieprawidłowe dane logowania');
                }
            }).catch(error=> setError('Nieprawidłowy email lub hasło'));
        handleLoginClose();
    }

    const handleLogOut = () => {
        ratingContext.toggleUser(0);
        ratingContext.toggleAction('reset',0);
    }

    const sectionUser = () => {

        if (ratingContext.userID === 0) return (
        <div className="navbar">
                <button onClick={handleRegister}>zarejestruj się</button>
                <button onClick={handleLogin}>zaloguj się</button>
                <span>{error}</span>
        </div>  
        );
        return (<div className="navbar">
            <button onClick={handleLogOut}>Wyloguj się</button>
            <button onClick={handleMore}>Twoje recezje</button>
            <span><b>{username} ({email}) liczba ocen: {counter}</b></span>
        </div>
            
        );
    }

    const sectionRegisterForm = () => {
        if(registerForm.view){
            return(
              <form onSubmit={handleRegisterSubmit} className="navbar">
                <div><input type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Wpisz nazwę użytkownika"
                    onChange={changeRegisterHandler}
                /></div>
                <div><input type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Wpisz adres e-mail"
                    onChange={changeRegisterHandler}
                /></div>
                <div><input type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Wpisz hasło"
                    onChange={changeRegisterHandler}
                /></div>
                <input type="submit" value="Zatwierdź" />
                <button onClick={handleRegisterClose}>Zamknij</button>
              </form>
            );
        }
    }

    const sectionLoginForm = () => {
        if(loginForm.view){
            return(
            
              <form onSubmit={handleLoginSubmit} className="navbar">
                <div><input type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Wpisz adres e-mail"
                    onChange={changeLoginHandler}
                /></div>
                <div><input type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Wpisz hasło"
                    onChange={changeLoginHandler}
                /></div>
                <input type="submit" value="Zatwierdź" />
                <button onClick={handleLoginClose}>Zamknij</button>
              </form>
            );
        }
    }
    return(
        <React.Fragment>{sectionUser()}{sectionRegisterForm()}{sectionLoginForm()}</React.Fragment>
    )
  }

  export default User;