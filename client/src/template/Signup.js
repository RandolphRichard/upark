import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = event => {
    const { name, value } = event.target;
   
    setFormState({
      ...formState,
      [name]: value
    });
  };


  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(formState)
    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-4 col-sm-offset-1">
            <h3>Sign Up</h3>
            <div className="form-group">
              <label>First Name</label>
              <input type="firstName"
                className="form-control"
                placeholder="Enter first name"
                name="firstName"
                id="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="lastName"
                className="form-control"
                placeholder="Enter last name"
                name="lastName"
                id="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="username"
                className="form-control"
                placeholder="Enter username"
                name="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
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
            <button type="submit" className="btn btn-dark d-block w-100">Sign up</button>
            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;