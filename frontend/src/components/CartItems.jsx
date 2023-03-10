import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { CartState } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserState } from "../context/UserProvider";

const cartItems = () => {
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, setUser } = UserState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handleBuy = async () => {
    // console.log(cart);
    setLoading(true);
    if (cart.length < 1) {
      toast({
        title: "No items in cart",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (
      fullName === "" ||
      pnumber === "" ||
      address === "" ||
      city === "" ||
      pincode === ""
    ) {
      toast({
        title: "Please provide all the details...",
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
        "http://localhost:5000/api/order",
        { userId: user._id, orders: cart },
        config
      );
      console.log(data);
      dispatch({
        type: "EMPTY_CART",
      });
      setTimeout(() => {
        history("/orders");
      }, 1000);
      toast({
        title: "Your order has been placed...",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error from server...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Flex minH={"72.7vh"} mt="120px" ml="10px">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
          flexBasis={"65%"}
          pb="50px"
        >
          <Heading color={"teal"} ml="100px">
            Shopping Cart
          </Heading>
          {cart.map((prod) => {
            return (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                maxW={"900px"}
                ml="100px"
                boxShadow="2xl"
                p={"0"}
                key={prod._id}
              >
                <Image
                  objectFit="fit"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={`../../../src/assets/images/${prod.src}`}
                  alt="Caffe Latte"
                  borderRight={"1px solid gray"}
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{prod.name}</Heading>
                    <Text py="2">{prod.desc}</Text>
                  </CardBody>
                  <CardFooter gap={"2"}>
                    <Select
                      w={"70px"}
                      value={prod.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            _id: prod._id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Select>
                    <Text color="blue.600" fontSize="2xl">
                      {`Rs : ${prod.price}`}
                    </Text>
                  </CardFooter>
                </Stack>
                <Button
                  bg={"white"}
                  _hover={{ bg: "white" }}
                  color="red"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    });
                  }}
                >
                  <AiOutlineDelete />
                </Button>
              </Card>
            );
          })}
        </VStack>

        {/* Order Summary */}
        <Stack alignContent="center" minW="300px" maxW={"400px"} ml="50px">
          <Card h={"auto"} boxShadow="2xl">
            <CardHeader>
              <Heading size="md">Order Summary</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="3">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Subtotal
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {`Rs : ${total}`}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Estimated Shipping
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {total > 0 ? "Rs : 100" : "Rs : 0"}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Discount
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {total > 0 ? "Rs : -800" : "Rs : 0"}
                  </Text>
                </Box>
                <Box>
                  <Heading size="lg" textTransform="uppercase">
                    Total
                  </Heading>
                  <Text pt="2" fontSize="lg" fontWeight={"bold"}>
                    {total > 0 ? `Rs : ${total - 700}` : "Rs : 0"}
                  </Text>
                </Box>
                <Box>
                  <Button variant="solid" colorScheme="teal" onClick={onOpen}>
                    Check Out
                  </Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Flex>
      {/* Paymen Modal Start*/}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {total > 0
              ? `Total Amount is Rs : ${total - 700}`
              : `Total Amount is Rs : 0`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Mobile Number"
                value={pnumber}
                onChange={(e) => setPnumber(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Shipping Address</FormLabel>
              <Input
                placeholder="Shipping Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Pin Code</FormLabel>
              <Input
                placeholder="Pin Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              ></Input>
            </FormControl>
            <Button
              onClick={handleBuy}
              mt={6}
              colorScheme={"teal"}
              width={"100%"}
            >
              Pay
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Paymen Modal End*/}
    </>
  );
};

export default cartItems;
