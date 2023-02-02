import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const SingleMenuItem = () => {
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const fetchSingleItem = async () => {
    let pathName = window.location.pathname.split("/")[2];
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/product",
        { itemId: pathName },
        config
      );
      setLoading(false);
      setItem(data);
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
    fetchSingleItem();
  }, []);

  return (
    <>
      {isLoading ? (
        <Heading>Laoding...</Heading>
      ) : (
        <>
          <Flex alignItems={"center"} justifyContent={"center"} mt={"49px"}>
            <Card minW={"md"} maxW="lg" mt={"100px"} boxShadow="dark-lg">
              <CardBody>
                <Image
                  objectFit={"cover"}
                  w={"80%"}
                  h="300px"
                  ml={"auto"}
                  mr="auto"
                  _hover={{ cursor: "pointer" }}
                  src={`../../../src/assets/images/${item.src}`}
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
                  <Button variant="solid" colorScheme="teal">
                    Add To Cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
        </>
      )}
    </>
  );
};

export default SingleMenuItem;
