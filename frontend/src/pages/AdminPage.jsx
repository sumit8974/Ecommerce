import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllProducts from "../components/AllProducts";
import CreateProduct from "../components/CreateProduct";
import AllOrders from "../components/AllOrders";
import Navbar from "../components/Navbar";
import { UserState } from "../context/UserProvider";

const AdminPage = () => {
  const toast = useToast();
  const { user } = UserState();
  const history = useNavigate();
  useEffect(() => {
    if (!user.isAdmin) {
      toast({
        title: "Error Occured!",
        description: "Unauthorized access...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      history("/");
      return;
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Tabs
        isFitted
        variant={"soft-rounded"}
        colorScheme={"green"}
        mt={"100px"}
        isLazy
      >
        <TabList>
          <Tab>Create Product</Tab>
          <Tab>All Product</Tab>
          <Tab>All Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CreateProduct />
          </TabPanel>
          <TabPanel>
            <AllProducts />
          </TabPanel>
          <TabPanel>
            <AllOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AdminPage;
