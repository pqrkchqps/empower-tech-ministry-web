import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  padding: 12px;
  align-items: center;
  border-radius: 5px;
`;

const ButtonText = styled.p`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const LinkText = styled.p`
  color: #007bff;
  font-size: 16px;
  font-weight: bold;
`;

function LoginOrRegister() {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Implement login functionality here
    // For demonstration, we'll assume successful login and store the token
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.headers["auth-token"];
      const user = response.data.user;

      loadUser(token, user);

      navigate("/");
    } catch (error) {
      console.log("Error while saving authentication token:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      const token = response.headers["auth-token"];
      const user = response.data.user;

      loadUser(token, user);

      navigate("/");
    } catch (error) {
      console.error("Error while saving authentication token:", error);
      console.log(error);
    }
  };

  return (
    <>
      {isRegisterOpen ? (
        <>
          <Title>Register for Empower Tech Ministry</Title>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister}>
            <ButtonText>Register</ButtonText>
          </Button>

          <div>
            Already have an account?
            <LinkText onClick={() => setIsRegisterOpen(false)}> Login</LinkText>
          </div>
        </>
      ) : (
        <>
          <Title>Login to Empower Tech Ministry</Title>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>
            <ButtonText>Login</ButtonText>
          </Button>
          <div>
            Don't have an account yet?
            <LinkText onClick={() => setIsRegisterOpen(true)}>
              {" "}
              Register
            </LinkText>
          </div>
        </>
      )}
    </>
  );
}

export default LoginOrRegister;
