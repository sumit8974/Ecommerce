import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserProvider";

const AllOrders = () => {
  const toast = useToast();
  const { user } = UserState();
  const [Allorders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/order/admin",
        config
      );
      // console.log(data);
      setOrders(data);
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
    fetchAllOrders();
    // console.log(orders.length > 0);
  }, []);

  return (
    <>
      <Box maxWidth={"900px"} margin={"auto"}>
        <Heading as="h5" size="md" mb={"10px"}>
          All Orders per user
        </Heading>
        {Allorders?.map((o) => (
          <Accordion allowMultiple key={o._id}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign={"left"}>
                    {o._id}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Flex
                  w={"90%"}
                  ml="auto"
                  mr={"auto"}
                  gap={"10"}
                  flexWrap="wrap"
                  alignItems={"center"}
                  justifyContent="center"
                  position="relative"
                >
                  {o.orders.map((ord, index) => (
                    <Card minW="xs" maxW="xs" key={index}>
                      <CardBody>
                        <Image
                          objectFit={"cover"}
                          h="260px"
                          ml={"auto"}
                          mr="auto"
                          transition={"transform .2s ease-in-out"}
                          _hover={{
                            cursor: "pointer",
                            transform: "scale(1.1)",
                          }}
                          src={`../../../src/assets/images/${ord.src}`}
                          loading="lazy"
                        ></Image>
                        <Stack mt="6" spacing="0">
                          <Heading size="md">{ord.name}</Heading>
                          <Text color="blue.600" fontSize="2xl">
                            Rs {ord.price}
                          </Text>
                          <Text>Quantity : {ord.qty}</Text>
                          <Text>
                            Order Date : {ord.date.toString().slice(0, 10)}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Text>{ord.desc.slice(0, 100)}</Text>
                      </CardFooter>
                    </Card>
                  ))}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default AllOrders;
