import { Button, Flex, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProductState } from "../context/ProductProvider";

const Filter = () => {
  const {
    productState: { byProductType },
    productDispatch,
  } = ProductState();
  return (
    <>
      <Flex mt={"100px"} pl="35px" alignItems={"center"}>
        <Text fontWeight={"bold"} mr="10px">
          Filters:
        </Text>
        <RadioGroup>
          <Stack spacing={2} direction="row">
            <input
              type="radio"
              name="group1"
              style={{ cursor: "pointer" }}
              checked={byProductType === "Laptop" ? true : false}
              onChange={() =>
                productDispatch({
                  type: "BY_PRODUCT_TYPE",
                  payload: "Laptop",
                })
              }
            />
            <label style={{ fontWeight: "bold" }}>Laptop</label>
            <input
              type="radio"
              name="group1"
              style={{ cursor: "pointer" }}
              checked={byProductType === "TV" ? true : false}
              onChange={() =>
                productDispatch({
                  type: "BY_PRODUCT_TYPE",
                  payload: "TV",
                })
              }
            />
            <label style={{ fontWeight: "bold" }}>TV</label>
            <input
              type="radio"
              name="group1"
              style={{ cursor: "pointer" }}
              checked={byProductType === "Phone" ? true : false}
              onChange={() =>
                productDispatch({
                  type: "BY_PRODUCT_TYPE",
                  payload: "Phone",
                })
              }
            />
            <label style={{ fontWeight: "bold" }}>Phone</label>
          </Stack>
        </RadioGroup>
        <Button
          ml="5px"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear
        </Button>
      </Flex>
    </>
  );
};

export default Filter;
