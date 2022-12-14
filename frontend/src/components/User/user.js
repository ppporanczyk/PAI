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
                    setError('Nieprawid??owe dane');
                    throw new Error("Error");
                }else if(res.data.status===409){
                    setError('Adres email jest zaj??ty');
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
                    setError('Nieprawid??owe dane logowania');
                }
            }).catch(error=> setError('Nieprawid??owy email lub has??o'));
        handleLoginClose();
    }

    const handleLogOut = () => {
        ratingContext.toggleUser(0);
        ratingContext.toggleAction('reset',0);
    }

    const sectionUser = () => {

        if (ratingContext.userID === 0) return (
        <div className="navbar">
                <button onClick={handleRegister}>zarejestruj si??</button>
                <button onClick={handleLogin}>zaloguj si??</button>
                <span>{error}</span>
        </div>  
        );
        return (<div className="navbar">
            <button onClick={handleLogOut}>Wyloguj si??</button>
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
                    placeholder="Wpisz nazw?? u??ytkownika"
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
                    placeholder="Wpisz has??o"
                    onChange={changeRegisterHandler}
                /></div>
                <input type="submit" value="Zatwierd??" />
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
                    placeholder="Wpisz has??o"
                    onChange={changeLoginHandler}
                /></div>
                <input type="submit" value="Zatwierd??" />
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