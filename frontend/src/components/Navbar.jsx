import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import { CartState } from "../context/CartProvider";
import { ProductState } from "../context/ProductProvider";
const Navbar = () => {
  const [itemName, setItemName] = useState("");
  const { productDispatch, fetchMenus } = ProductState();
  const { user } = UserState();
  const history = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {
    state: { cart },
  } = CartState();
  const handleItemName = (e) => {
    productDispatch({
      type: "SEARCH_FILTER",
      payload: e.target.value,
    });
  };
  const handleCartClick = () => {
    history("/cart");
  };
  const handleAdminRoute = () => {
    if (user?.isAdmin) {
      history("/admin");
    }
  };
  const handleOrdersClick = () => {
    if (user?.name === "nouser") {
      toast({
        title: "Login First...",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      history("/home");
      return;
    }
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
      history("/home");
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
            onClick={() => {
              fetchMenus();
              history("/");
            }}
          >
            TechHub
          </Link>
        </Heading>
        <Input
          variant={"filled"}
          placeholder="Search an Item"
          flexBasis={"40%"}
          onChange={(e) => handleItemName(e)}
        />

        <Flex
          alignItems={"center"}
          gap="2"
          display={{ base: "none", md: "none", lg: "flex" }}
        >
          <Link
            color={"teal.500"}
            _hover={{ textDecoration: "none" }}
            fontWeight="bold"
            mr="3px"
          >
            {!user
              ? "No User"
              : user.name.length > 6
              ? user.name.slice(0, 5) + ".."
              : user.name}
          </Link>
          <Button
            bg={"white"}
            color={"teal"}
            _hover={{ bg: "teal.100", transition: "ease-in 0.3s" }}
            display={"flex"}
            alignItems="center"
            gap={1}
            onClick={handleCartClick}
          >
            <FaShoppingCart />
            Cart {cart.length > 0 ? cart.length : ""}
          </Button>
          <Button
            bg={"white"}
            color={"teal"}
            _hover={{ bg: "teal.100", transition: "ease-in 0.3s" }}
            onClick={handleOrdersClick}
          >
            Orders
          </Button>
          {user?.isAdmin ? (
            <Button
              bg={"white"}
              color={"teal"}
              _hover={{ bg: "teal.100", transition: "ease-in 0.3s" }}
              onClick={handleAdminRoute}
            >
              Admin
            </Button>
          ) : null}
          {user?.name === "nouser" ? (
            <Button
              bg={"white"}
              color={"teal"}
              _hover={{ bg: "teal.100", transition: "ease-in 0.3s" }}
              mr="10px"
              onClick={() => history("/home")}
            >
              Login
            </Button>
          ) : (
            <Button
              bg={"white"}
              color={"teal"}
              _hover={{ bg: "teal.100", transition: "ease-in 0.3s" }}
              mr="10px"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          )}
        </Flex>
        <Button
          ref={btnRef}
          colorScheme="white"
          onClick={onOpen}
          display={{ lg: "none", xl: "none" }}
          marginRight={"5px"}
        >
          <GiHamburgerMenu fontSize={"20"} color="teal" />
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton fontSize={"20"} />
            <DrawerBody
              display={"flex"}
              flexDirection={"column"}
              gap={"2"}
              marginTop={"50px"}
            >
              <Link
                color={"teal.500"}
                _hover={{ textDecoration: "none" }}
                fontWeight="bold"
                mr="3px"
                fontSize={"30"}
              >
                User:{" "}
                {!user
                  ? "No User"
                  : user.name.length > 6
                  ? user.name.slice(0, 5) + ".."
                  : user.name}
              </Link>
              <Button
                color={"teal.500"}
                display={"flex"}
                alignItems="center"
                gap={1}
                onClick={handleCartClick}
                padding={"30px"}
              >
                <FaShoppingCart />
                Cart {cart.length > 0 ? cart.length : ""}
              </Button>
              <Button
                padding={"30px"}
                color={"teal.500"}
                onClick={handleOrdersClick}
              >
                Orders
              </Button>
              {user?.isAdmin ? (
                <Button
                  padding={"30px"}
                  color={"teal.500"}
                  onClick={handleAdminRoute}
                >
                  Admin
                </Button>
              ) : null}
              {user?.name === "nouser" ? (
                <Button
                  padding={"30px"}
                  color={"teal.500"}
                  onClick={() => history("/home")}
                >
                  Login
                </Button>
              ) : (
                <Button
                  padding={"30px"}
                  color={"teal.500"}
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
