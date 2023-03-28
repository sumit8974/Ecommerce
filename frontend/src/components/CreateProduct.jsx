import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
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
    file: "",
  });
  const [imageFile, setImageFile] = useState();
  const [isUploading, setUploading] = useState(false);
  const [isImageUploading, setImageUploading] = useState(false);
  const toast = useToast();
  async function handleUploadImage() {
    setImageUploading(true);
    if (imageFile === undefined) {
      toast({
        title: "Please upload a picture...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setImageUploading(false);
      return;
    }
    if (imageFile.type === "image/jpeg" || imageFile.type === "image/png") {
      const imgData = new FormData();
      imgData.append("file", imageFile);
      imgData.append("upload_preset", "w80phwn4");
      imgData.append("cloud_name", "sumit9876");
      fetch("https://api.cloudinary.com/v1_1/sumit9876/image/upload", {
        method: "post",
        body: imgData,
      })
        .then((res) => res.json())
        .then((data) => {
          setProduct((prev) => {
            return {
              ...prev,
              file: data.url.toString(),
            };
          });
          toast({
            title: "Image uploaded successfully...",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setImageUploading(false);
        })
        .catch((err) => {
          toast({
            title: "Error in uploading image...",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setImageUploading(false);
          console.log(err);
        });
    } else {
      toast({
        title: "Please upload a valid image...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setImageUploading(false);
    }
  }
  async function handleUpload() {
    // console.log(product);
    setUploading(true);
    if (
      product.name === "" ||
      product.price <= 0 ||
      product.category === "" ||
      product.desc === "" ||
      product.file === ""
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
    formData.append("imageFile", product.file);
    formData.append("prodName", product.name);
    formData.append("prodPrice", product.price);
    formData.append("prodCategory", product.category);
    formData.append("prodDesc", product.desc);
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_URL + "/api/product/upload",
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
      file: "",
    });
    fileRef.current.value = "";
  }

  return (
    <Container>
      <Flex
        flexDirection={"column"}
        maxWidth={"700px"}
        maxHeight={"600px"}
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
                setImageFile(e.target.files[0]);
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
          {isUploading ? <Spinner /> : "Add Product"}
        </Button>
        <Button
          mt="10px"
          p={"10px"}
          colorScheme="green"
          size="md"
          variant="solid"
          width={"200px"}
          onClick={handleUploadImage}
          isDisabled={product.file !== "" ? true : false}
        >
          {isImageUploading ? (
            <Spinner />
          ) : product.file !== "" ? (
            "Image uploaded"
          ) : (
            "Upload Image"
          )}
          {/* Upload Image */}
        </Button>
      </Flex>
    </Container>
  );
};

export default CreateProduct;
