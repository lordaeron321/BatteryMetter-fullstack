import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../register.css';


function RegistrationForm() {
    const navigate = useNavigate();
    const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$');
    const [message, setMessage]= useState(null);
   
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    function Validate(e){
        if(e.target.password.value != e.target.password2.value){
            setMessage("Podane hasla są różne")
            return "Podane hasła są różne"
        }else{
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const newFormData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };
        console.log(newFormData);

        if(Validate(e) == true){
    
            let response= await fetch('https://battery-metter-backend.azurewebsites.net/api/register/',{
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(newFormData) 
            });

        try {
            setFormData(newFormData);

        } catch (error) {
            console.log("zlapalem error")
        }
       

        let data= await response.json()
        console.log(data)
        console.log(data.message)

        if(response.ok){
            navigate('/login')
            setMessage(data.message);
        }else{
            setMessage(data.message);
        }
        }else{
            console.log(Validate(e));
        }

       
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Nazwa użytkownika:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                />
            </div>
            <div>
                <label htmlFor="password">Hasło:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                />
            </div>
            <div>
                <label htmlFor="password2">Powtórz Hasło:</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                />
            </div>
            <button type="submit">Zarejestruj się</button>
            {message}
        </form>
    );
    
}

export default RegistrationForm;
