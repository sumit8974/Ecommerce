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
import { AiOutlineDelete } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { CartState } from "../context/CartProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { buyProducts } from "../api";
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
  const { user } = UserState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handleBuy = async (token) => {
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
      const orderData = {
        userId: user._id,
        orders: cart,
        amount: (total - 700) / 100,
      };
      const data = await buyProducts(orderData, config);
      // console.log(data);
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
      console.log(err);
      toast({
        title: "Error from server...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  function handleCheckOut() {
    if (user.name === "nouser") {
      toast({
        title: "Login to buy product...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      history("/home?redirectTo=/cart");
      return;
    }
    onOpen();
  }
  return (
    <>
      <Flex
        minH={"72.7vh"}
        mt="120px"
        ml="10px"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        alignItems={{ base: "left" }}
      >
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
          flexBasis={"65%"}
          pb="50px"
          paddingLeft={"10px"}
          paddingRight={"10px"}
        >
          <Heading color={"teal"} ml="100px">
            Shopping Cart
          </Heading>
          {cart.map((prod) => {
            return (
              <Card
                direction={{ base: "column", sm: "row", md: "row" }}
                overflow="hidden"
                variant="outline"
                maxW={"900px"}
                ml={{ lg: "100px" }}
                boxShadow="2xl"
                p={"0"}
                key={prod._id}
              >
                <Image
                  objectFit="fit"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={`${prod.src}`}
                  alt="Caffe Latte"
                  borderRight={"1px solid gray"}
                  _hover={{ cursor: "pointer" }}
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{prod.name}</Heading>
                    <Text py="2">{prod.desc}</Text>
                  </CardBody>
                  <CardFooter gap={{ base: "2", sm: "1", md: "2" }}>
                    <Select
                      w="60px"
                      h="40px"
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
                    <Text
                      color="blue.600"
                      fontSize={{ base: "xl", sm: "md", md: "xl" }}
                      display="flex"
                      alignItems="center"
                    >
                      {`Rs : ${prod.price}`}
                    </Text>
                    <Button
                      bg={"white"}
                      _hover={{ bg: "red.100" }}
                      color="red"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        });
                      }}
                    >
                      <AiOutlineDelete fontSize={"15"} />
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            );
          })}
        </VStack>

        {/* Order Summary */}
        <Stack
          alignContent="center"
          minW="300px"
          maxW={"400px"}
          ml="10px"
          mb="10px"
          mr="10px"
        >
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
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={handleCheckOut}
                  >
                    Check Out
                  </Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Flex>
      {/* Paymen Modal Start*/}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", sm: "sm", md: "md" }}
      >
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
