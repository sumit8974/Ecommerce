import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const Orders = () => {
  const toast = useToast();
  const { user } = UserState();
  const [orders, setOrders] = useState([]);
  const history = useNavigate();

  const fetchUsersOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://ecommerce-sumit.onrender.com/api/order",
        config
      );
      // console.log(data);
      setOrders(data.orders);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    if (user.name !== "nouser") fetchUsersOrders();
    // console.log(orders.length > 0);
  }, [user]);
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      mt={"100px"}
      minH={"74.7vh"}
      display={"flex"}
      mb={"80px"}
      p={"20px"}
    >
      <Heading color={"teal"} ml="100px">
        Your Orders
      </Heading>
      {orders?.length > 0 &&
        orders.map((order, index) => {
          return (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              maxW={"900px"}
              boxShadow="2xl"
              p={"0"}
              mr={"auto"}
              ml={"auto"}
              key={index}
            >
              <Image
                objectFit="fit"
                maxW={{ base: "100%", sm: "200px" }}
                src={`${order.src}`}
                alt="Caffe Latte"
                borderRight={"1px solid gray"}
                cursor={"pointer"}
              />

              <Stack>
                <CardBody>
                  <Heading size="md">{order.name}</Heading>
                  <Text py="2">{order.desc.slice(0)}</Text>
                  <Text>{`Ouantity : ${order.qty}`}</Text>
                  <Text>Date : {order.date.toString().slice(0, 10)}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    {`Amount : ${order.price}`}
                  </Text>
                </CardBody>
              </Stack>
            </Card>
          );
        })}
    </VStack>
  );
};

export default Orders;
