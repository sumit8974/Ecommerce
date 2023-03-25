import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { UserState } from "../context/UserProvider";
import axios from "axios";

const CreateProduct = () => {
  const { user } = UserState();
  const fileRef = useRef(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
    file: null,
  });
  const [isUploading, setUploading] = useState(false);
  const toast = useToast();
  async function handleUpload() {
    console.log(product);
    setUploading(true);
    if (
      product.name === "" ||
      product.price <= 0 ||
      product.category === "" ||
      product.desc === "" ||
      product.file === null
    ) {
      toast({
        title: "Provide valid product detail...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setUploading(false);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const formData = new FormData();
    formData.append("file", product.file);
    formData.append("prodName", product.name);
    formData.append("prodPrice", product.price);
    formData.append("prodCategory", product.category);
    formData.append("prodDesc", product.desc);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/product/upload",
        formData,
        config
      );
      console.log(data);
    } catch (err) {
      toast({
        title: "Error Occured...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setUploading(false);
      return;
    }
    toast({
      title: "Product added...",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setUploading(false);
    setProduct({
      name: "",
      price: "",
      category: "",
      desc: "",
      file: null,
    });
    fileRef.current.value = "";
  }

  return (
    <Container>
      <Flex
        flexDirection={"column"}
        maxWidth={"700px"}
        maxHeight={"500px"}
        border="3px solid green"
        borderRadius={"10px"}
        padding={"20px"}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  price: e.target.value,
                };
              })
            }
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            value={product.category}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  category: e.target.value,
                };
              })
            }
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            value={product.desc}
            onChange={(e) =>
              setProduct((prev) => {
                return {
                  ...prev,
                  desc: e.target.value,
                };
              })
            }
          ></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>Image File</FormLabel>
          <div>
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => {
                setProduct((prev) => {
                  return {
                    ...prev,
                    file: e.target.files[0],
                  };
                });
              }}
            ></input>
          </div>
        </FormControl>
        <Button
          mt="15px"
          p={"10px"}
          colorScheme="green"
          size="md"
          variant="solid"
          width={"200px"}
          onClick={handleUpload}
        >
          Add Product
        </Button>
      </Flex>
    </Container>
  );
};

export default CreateProduct;
