import React, { useState , useEffect } from 'react'
import { useNavigate,Link} from "react-router-dom"
import axios from "axios"
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const navigate = useNavigate()
    const [value,setValue] = useState({
        username:"",
        password: ""
    })

    const validateForm = () => {
      const { username, password } = value;
      if (username === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      } else if (password === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      }
      return true;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (validateForm()) {
        const { username, password } = value;
        const { data } = await axios.post('/auth/login', {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            "chat-app-current-user",
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      }
    };
    
    useEffect(() => {
      if (localStorage.getItem("chat-app-current-user")) {
        navigate("/");
      }
    },[]);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


    const handleChange = (e) =>{
     setValue({...value,[e.target.name]:e.target.value})
    }

  return (
    <>
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register.</Link>
          </span>
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}

export default Login

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;