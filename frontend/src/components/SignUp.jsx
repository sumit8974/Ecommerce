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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validateEmail";
import { checkPassword } from "../utils/checkPassword";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_SERVICE_URL;
  const toast = useToast();
  const history = useNavigate();
  const handleSignUp = async () => {
    setLoading(true);
    if (userName === "" || password === "" || email === "") {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Provide a valid email...",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!checkPassword(password)) {
      toast({
        title:
          "password of min 8 letter, with at least a symbol, upper, lower case and a number...",
        status: "warning",
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
        `${API_URL}/api/user`,
        { name: userName, password, email },
        config
      );
      // console.log(data);
      toast({
        title: "User create successfully",
        status: "success",
        duration: 5000,
        isClosable: "true",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setTimeout(() => {
        history("/");
      }, 1000);
    } catch (err) {
      toast({
        title: "Error occured",
        description: "Email already exist",
        status: "error",
        duration: 5000,
        isClosable: true,
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
        <FormLabel>User Name</FormLabel>
        <Input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </FormControl>
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
        onClick={handleSignUp}
      >
        {loading ? <Spinner /> : "Signup"}
      </Button>
    </VStack>
  );
};

export default SignUp;
