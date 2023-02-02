import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import { CartState } from "../context/CartProvider";
const Navbar = () => {
  const [itemName, setItemName] = useState("");
  const { user, setUser } = UserState();
  const history = useNavigate();
  const toast = useToast();
  const {
    state: { cart },
  } = CartState();
  const handleItemName = (e) => {
    setItemName(e.target.value);
    // console.log(itemName);
  };
  const handleCartClick = () => {
    history("/cart");
  };
  const handleOrdersClick = () => {
    history("/orders");
  };
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    toast({
      title: "Logout Success...",
      status: "success",
      isClosable: true,
      duration: 5000,
    });
    setTimeout(() => {
      history("/");
    }, 1000);
  };
  return (
    <>
      <Box
        bg="white"
        w="100%"
        h="75px"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        boxShadow="xl"
        position={"fixed"}
        top="0"
        zIndex={"999"}
      >
        <Heading as={"h1"} ml="5px" color={"teal"}>
          <Link
            _hover={{ textDecoration: "none" }}
            onClick={() => history("/menus")}
          >
            Ecommerce
          </Link>
        </Heading>
        <Input
          variant={"filled"}
          placeholder="Search an Item"
          flexBasis={"40%"}
          onChange={(e) => handleItemName(e)}
        />

        <Flex alignItems={"center"} gap="2">
          <Link
            color={"teal.500"}
            _hover={{ textDecoration: "none" }}
            fontWeight="bold"
            mr="3px"
          >
            {!user
              ? "No User"
              : user.name.length > 5
              ? user.name.slice(0, 5) + ".."
              : user.name}
          </Link>
          <Button
            colorScheme="teal"
            display={"flex"}
            alignItems="center"
            gap={1}
            onClick={handleCartClick}
          >
            <FaShoppingCart />
            Cart
            <Text fontSize={"14px"} fontWeight="500" mt="3px">
              {cart.length}
            </Text>
          </Button>
          <Button colorScheme="teal" onClick={handleOrdersClick}>
            Orders
          </Button>
          {!user ? (
            <Button colorScheme="teal" mr="10px" onClick={() => history("/")}>
              Login
            </Button>
          ) : (
            <Button colorScheme="teal" mr="10px" onClick={handleLogOut}>
              Logout
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
