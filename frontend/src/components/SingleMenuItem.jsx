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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CartState } from "../context/CartProvider";
import { ProductState } from "../context/ProductProvider";

const SingleMenuItem = () => {
  const pathName = window.location.pathname.split("/")[2];
  const { productState } = ProductState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const item = productState.product?.find((ele) => {
    return ele._id == pathName;
  });

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} mt={"30px"}>
        {item === undefined ? (
          <Heading mt={"50px"}>🌀 Loading...</Heading>
        ) : (
          <Card
            minW={"base"}
            mt={"100px"}
            boxShadow="dark-lg"
            maxW={{ base: "95%", sm: "90%", md: "80%" }}
          >
            <CardBody display={{ md: "block", lg: "flex" }}>
              <Image
                objectFit={{ lg: "cover" }}
                h="400px"
                maxWidth={{ base: "350px", sm: "400px", md: "500px" }}
                ml={"auto"}
                mr={{ base: "auto", sm: "auto", lg: "10px" }}
                transition={"transform .2s ease-in-out"}
                _hover={{ cursor: "pointer" }}
                src={`${item.src}`}
                loading="lazy"
              ></Image>
              <Stack mt="6" spacing="3">
                <Heading size="md">{item.name}</Heading>
                <Text>{item.desc}</Text>
                <Text color="blue.600" fontSize="2xl">
                  Rs : {item.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                {cart.some((p) => p._id === item._id) ? (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
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
                        payload: item,
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
        )}
      </Flex>
    </>
  );
};

export default SingleMenuItem;
