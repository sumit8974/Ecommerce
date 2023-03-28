import {
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
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { CartState } from "../context/CartProvider";
import { ProductState } from "../context/ProductProvider";
import Filter from "./Filter";

const MenuItems = () => {
  const history = useNavigate();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const { productState, isLoading } = ProductState();
  // const prod = productState.product;
  // const fetchMenus = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get("http://localhost:5000/api/product");
  //     setLoading(false);
  //     setMenus(data);
  //   } catch (err) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Could not Load the products",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     setLoading(false);
  //   }
  // };
  const transformProducts = () => {
    let sortedProducts = productState.product;
    let searchQuery = productState.searchQuery;
    let filterByProduct = productState.byProductType;
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    if (filterByProduct === "Laptop") {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.category === "Laptop"
      );
    }
    if (filterByProduct === "TV") {
      sortedProducts = sortedProducts.filter((prod) => prod.category === "TV");
    }
    if (filterByProduct === "Phone") {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.category === "Phone"
      );
    }
    return sortedProducts;
  };
  return (
    <>
      <Filter />
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
        mt={"30px"}
      >
        {isLoading ? (
          <Heading>🌀 Loading...</Heading>
        ) : (
          transformProducts()?.map((data, index) => {
            return (
              <Card minW={"sm"} maxW="sm" key={data._id}>
                <CardBody>
                  <Image
                    objectFit={"cover"}
                    h="260px"
                    ml={"auto"}
                    mr="auto"
                    transition={"transform .2s ease-in-out"}
                    _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
                    src={`${data.src}`}
                    loading="lazy"
                  ></Image>
                  <Stack mt="6" spacing="3">
                    <Heading
                      size="md"
                      _hover={{ cursor: "pointer", color: "blue.600" }}
                      onClick={() => {
                        history(`/singlemenu/${data._id}`);
                      }}
                    >
                      {data.name}
                    </Heading>
                    <Text color="blue.600" fontSize="2xl">
                      Rs : {data.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
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
    </>
  );
};

export default MenuItems;
