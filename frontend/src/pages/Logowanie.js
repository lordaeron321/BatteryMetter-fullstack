import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Logowanie() {
    const navigate = useNavigate();
    const [message, setMessage]= useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const newFormData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        let response= await fetch('http://localhost:8000/api/logowanie/',{
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFormData) 
            });

            let data= await response.json()
            const user_id= data['user_id'];
            console.log(data['user_id']);
            console.log(response.ok);

            if(! response.ok){
                setMessage(data.message);
                console.log(data.message);
            }
            else{
               
                console.log(newFormData)
                sessionStorage.setItem('user_id', user_id);
                console.log(sessionStorage.getItem('user_id'));
                window.location.reload();
                navigate('/home')
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
                <label htmlFor="password">Hasło:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                />
            </div>
            <button type="submit">Logowanie</button>
            {message}
        </form>
    );
    
}

export default Logowanie;
