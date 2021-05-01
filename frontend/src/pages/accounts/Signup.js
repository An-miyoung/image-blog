import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert } from "antd";
import { useHistory } from "react-router";

export default function Signup() {
    const history = useHistory();
    const [inputs, setInputs] = useState({ username: "", password: ""});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formDisabled, setFormDisabled] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        Axios.post("http://localhost:8000/accounts/signup/", inputs)
            .then(response => {
                console.log("response: ", response);
                history.push("/accounts/login");
            })
            .catch(error => {
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(" "),
                        password: (error.response.data.password || []).join(" "),
                    });
                }
                console.log("error: ",  error);
            })
            .finally(() => {
                setLoading(false);
            });
        
    };

    useEffect(() => {
        const isEnabled = Object.values(inputs).every(s => s.length > 0);
        setFormDisabled(!isEnabled);
    },[inputs])

    const onChange = e => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div> 
            
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="username" onChange={onChange}/>
                    { errors.username && <Alert type="error" message={errors.username}/>}
                </div>
                <div>
                    <input type="password" name="password" onChange={onChange}/>
                    { errors.password && <Alert type="error" message={errors.password}/>}
                </div>
                <div>
                    <input type="submit" value="회원가입" disabled={loading || formDisabled}/>
                </div>
            </form>
        </div>
    );
}