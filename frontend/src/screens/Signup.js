import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../redux/actions/authActions";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    dispatch(signUp({ email, password, name }, history));
  };

  return (
    <div class="wrapper" style={{ padding: "2rem" }}>
      <section class="section sign-up">
        <form action="">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          {error !== null ? <div className="error">{error}</div> : null}
          <button
            className="btn waves-effect waves-light #42a5f5 blue lighten-1"
            onClick={handleSignUpClick}
            style={{ cursor: "pointer" }}
          >
            SignUP
          </button>
          <h5>
            <Link to="/signin">Already have an account?</Link>
          </h5>
        </form>
      </section>
    </div>
  );
};

export default Signup;
