import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import items from "../../data";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { CartState } from "../context/CartProvider";

const MenuItems = () => {
  const history = useNavigate();
  const [menus, setMenus] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { user, setUser } = UserState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  // console.log(cart);
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/product");
      setLoading(false);
      setMenus(data);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Could not Load the products",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMenus();
    // console.log(user);
  }, []);
  return (
    <Flex
      w={"90%"}
      ml="auto"
      mr={"auto"}
      p="20px"
      gap={"10"}
      flexWrap="wrap"
      alignItems={"center"}
      justifyContent="center"
      position="relative"
      mt={"100px"}
    >
      {isLoading ? (
        <Heading>Loading</Heading>
      ) : (
        menus.map((data, index) => {
          return (
            <Card minW={"sm"} maxW="sm" key={data._id}>
              <CardBody>
                <Image
                  objectFit={"cover"}
                  h="260px"
                  ml={"auto"}
                  mr="auto"
                  _hover={{ cursor: "pointer" }}
                  src={`../../../src/assets/images/${data.src}`}
                  loading="lazy"
                ></Image>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{data.name}</Heading>
                  <Text color="blue.600" fontSize="2xl">
                    Rs : {data.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  {/* <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => history(`/singlemenu/${data._id}`)}
                  >
                    View
                  </Button> */}
                  {cart.some((p) => p._id === data._id) ? (
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: data,
                        });
                      }}
                      variant="solid"
                      colorScheme="red"
                    >
                      Remove from cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: data,
                        });
                      }}
                      variant="solid"
                      colorScheme="teal"
                    >
                      Add to cart
                    </Button>
                  )}
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })
      )}
    </Flex>
  );
};

export default MenuItems;
