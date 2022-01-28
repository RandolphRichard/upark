import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN);

    
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        
        setFormState({
            email: '',
            password: ''
        });
    };

    return (

        <form onSubmit={handleFormSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-4 col-sm-offset-1">
                        <h3>Log in</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark d-block w-100">Sign in</button>
                        <p className="create-account text-right">
                            Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login;