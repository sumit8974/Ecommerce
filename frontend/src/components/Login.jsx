import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const history = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      toast({
        title: "Fill all the details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        // "http://localhost:5000/api/user/login",
        "api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successfull",
        status: "success",
        isClosable: true,
        duration: 5000,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setTimeout(() => {
        history("/menus");
      }, 1000);
    } catch (err) {
      // console.log(err);
      toast({
        title: "Error Occured",
        description: "Check the credentails...",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      setLoading(false);
    }
  };
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <VStack color="black" spacing={3}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.8rem" size="sm" p="20px" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        style={{ marginTop: "15px" }}
        colorScheme="green"
        size="md"
        variant="solid"
        width={"100%"}
        onClick={handleLogin}
      >
        {loading ? <Spinner /> : "Login"}
      </Button>
      <Link>Forget Password</Link>
    </VStack>
  );
};

export default Login;
