import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        bg="white"
        w="100%"
        boxShadow="dark-lg"
        p={"5px"}
        mt="5px"
        position={"absolute"}
        bottom="-136"
      >
        <Text textAlign={"center"} fontWeight="bold">
          Made By Sumit Laishram
        </Text>
      </Box>
    </>
  );
};

export default Footer;
