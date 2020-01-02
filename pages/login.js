import React from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import Link from "next/link";
import catchErrors from "../utils/catchErrors";
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const formValid = Object.values(user).every(el => Boolean(el));

    formValid ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = event => {
    const { name, value } = event.target;

    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/login`;
      const payload = { ... user };
      const response = await axios.post(url, payload);

      handleLogin(response.data.token);
    } catch (e) {
      catchErrors(e, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Message
        attached
        icon="user"
        header="Login"
      />

      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error.message} />
        <Segment>
        
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          ></Form.Input>
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          ></Form.Input>
          <Button
            icon="signup"
            disabled={disabled || loading}
            type="submit"
            color="orange"
            content="Sign in"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help"></Icon>
        Don't have an account yet?{" "}
        <Link href="/signup">
          <a>Signup here</a>
        </Link>{" "}
        instead.
      </Message>
    </>
  );
}

export default Login;
