import React from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import errorImage from "../assets/error.gif"; // Adjust the path as necessary

const ErrorPage = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={6}
      >
        <Text
          fontSize="6xl"
          fontWeight="bold"
          mb={2}
          color="red.500"
          textAlign={"center"}
          c
        >
          404 - Not Found <br />
        </Text>
        <Image
          src={errorImage}
          alt="Error for page not found"
          aspectRatio={4 / 3}
          width="50vw"
          height="50vh"
          fit="cover"
          objectPosition="center"
        />

        <Text
          fontSize="lg"
          color="gray.600"
          mt={2}
          textAlign={"center"}
          fontWeight="semibold"
        >
          The page you are looking for does not exist or has been moved.
        </Text>

        <Button
          mt={4}
          colorPalette="brand"
          onClick={() => (window.location.href = "/universities")}
        >
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
