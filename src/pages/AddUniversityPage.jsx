import React from "react";
import { Box, Container, VStack } from "@chakra-ui/react";

import AddUniversityForm from "../components/university/AddUniversityForm";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import useAddUniversity from "../hooks/useAddUniversity";

const AddUniversityPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  const { addUniversity } = useAddUniversity();

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const success = addUniversity(data);
    if (success === true) {
      navigate("/universities");
    }
  };
  const handleCancel = () => {
    navigate("/universities");
  };
  return (
    <Box minH="100vh" bg={bg} py={8}>
      <Container maxW="container.xl">
        <VStack spaceY={8}>
          <AddUniversityForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </VStack>
      </Container>
    </Box>
  );
};

export default AddUniversityPage;
