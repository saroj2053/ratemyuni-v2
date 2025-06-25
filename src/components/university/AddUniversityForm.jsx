import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  NumberInput,
  Select,
  SimpleGrid,
  InputGroup,
  Separator,
  Heading,
  Field,
  Portal,
  Tag,
  FileUpload,
  CloseButton,
  createListCollection,
} from "@chakra-ui/react";
import { BookOpen, Plus, X } from "lucide-react";

import { RiBuilding2Fill, RiMapPin5Fill } from "react-icons/ri";
import { IoGlobeSharp } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import { useColorModeValue } from "../ui/color-mode";
import useAddUniversity from "../../hooks/useAddUniversity";
import { toaster } from "../ui/toaster";

const AddUniversityForm = ({ onSubmit, onCancel }) => {
  const [universityData, setUniversityData] = useState({
    name: "",
    location: "",
    establishedYear: "",
    description: "",
    type: "",
    websiteUrl: "",
    programs: [],
    facilities: [],
  });

  const [newProgram, setNewProgram] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [universityLogo, setUniversityLogo] = useState();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const sectionBg = useColorModeValue("gray.50", "gray.700");

  const { isSaving } = useAddUniversity();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUniversityLogo(file);
    } else {
      alert("Please upload a valid image file.");
      setUniversityLogo(null);
    }
  };

  const addProgram = () => {
    if (
      newProgram.trim() &&
      !universityData.programs.includes(newProgram.trim())
    ) {
      setUniversityData({
        ...universityData,
        programs: [...universityData.programs, newProgram.trim()],
      });
      setNewProgram("");
    }
  };

  const removeProgram = (program) => {
    setUniversityData({
      ...universityData,
      programs: universityData.programs.filter((p) => p !== program),
    });
  };

  const addFacility = () => {
    if (
      newFacility.trim() &&
      !universityData.facilities.includes(newFacility.trim())
    ) {
      setUniversityData({
        ...universityData,
        facilities: [...universityData.facilities, newFacility.trim()],
      });
      setNewFacility("");
    }
  };

  const removeFacility = (facility) => {
    setUniversityData({
      ...universityData,
      facilities: universityData.facilities.filter((f) => f !== facility),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !universityData.name ||
      !universityData.location ||
      !universityData.type ||
      !universityData.establishedYear ||
      !universityData.websiteUrl ||
      !universityData.description ||
      !universityData.programs.length ||
      !universityData.facilities.length ||
      !universityLogo
    ) {
      toaster.error({
        description: "Please fill in all required fields.",
        closable: true,
      });
      return;
    }

    const formData = new FormData();
    if (universityLogo) {
      formData.append("file", universityLogo);
    }
    formData.append(
      "university",
      new Blob(
        [
          JSON.stringify({
            name: universityData.name,
            location: universityData.location,
            establishedYear: universityData.establishedYear,
            description: universityData.description,
            type: universityData.type,
            websiteUrl: universityData.websiteUrl,
            programs: universityData.programs,
            facilities: universityData.facilities,
          }),
        ],
        { type: "application/json" }
      )
    );
    onSubmit(formData);
    setUniversityData({
      name: "",
      location: "",
      establishedYear: "",
      description: "",
      type: "",
      websiteUrl: "",
      programs: [],
      facilities: [],
    });
    setUniversityLogo(null);
    setNewProgram("");
    setNewFacility("");
  };

  const types = createListCollection({ items: ["Public", "Private"] });

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      p={8}
      shadow="xl"
      maxW="4xl"
      mx="auto"
    >
      <form onSubmit={handleSubmit}>
        <VStack spaceY={8} align="stretch">
          <VStack spaceY={2} textAlign="center">
            <Heading size="2xl" fontWeight="bold" color="brand.600">
              Add New University
            </Heading>
            <Text color="gray.600">
              Fill in the details to add a new university to the database
            </Text>
          </VStack>

          {/* Basic Information */}
          <Box bg={sectionBg} p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="gray.800">
              Basic Information
            </Heading>

            <Field.Root required my={4}>
              <Field.Label>
                University Name <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup
                startElement={<RiBuilding2Fill size={18} color="gray.400" />}
              >
                <Input
                  placeholder="Enter university name"
                  value={universityData.name}
                  onChange={(e) =>
                    setUniversityData({
                      ...universityData,
                      name: e.target.value,
                    })
                  }
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                />
              </InputGroup>
            </Field.Root>

            <SimpleGrid columns={{ base: 1, md: 2 }} mb={4} gapX={28} gapY={4}>
              <Select.Root
                size="sm"
                width="320px"
                bg="white"
                collection={types}
                onValueChange={(e) =>
                  setUniversityData({
                    ...universityData,
                    type: e.items[0],
                  })
                }
              >
                <Select.HiddenSelect />
                <Select.Label>Select University Type</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select type" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {types.items.map((type, index) => (
                        <Select.Item item={type} key={type + index}>
                          {type} <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              <Field.Root required>
                <Field.Label>
                  Established Year
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup>
                  <NumberInput.Root
                    min={1800}
                    max={new Date().getFullYear()}
                    value={universityData.establishedYear}
                    onChange={(e) =>
                      setUniversityData({
                        ...universityData,
                        establishedYear: e.target.value,
                      })
                    }
                  >
                    <NumberInput.Input placeholder="YYYY" />
                  </NumberInput.Root>
                </InputGroup>
              </Field.Root>
            </SimpleGrid>

            <Field.Root required>
              <Field.Label>
                Location <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup
                startElement={<RiMapPin5Fill size={18} color="gray.400" />}
              >
                <Input
                  value={universityData.location}
                  onChange={(e) =>
                    setUniversityData({
                      ...universityData,
                      location: e.target.value,
                    })
                  }
                  placeholder="City, District"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                />
              </InputGroup>
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>
                Website URL <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup
                startElement={<IoGlobeSharp size={18} color="gray.400" />}
              >
                <Input
                  value={universityData.websiteUrl}
                  onChange={(e) =>
                    setUniversityData({
                      ...universityData,
                      websiteUrl: e.target.value,
                    })
                  }
                  placeholder="https://university.edu.np"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                />
              </InputGroup>
            </Field.Root>

            <Field.Root mt={4} required>
              <Field.Label>
                University Logo <Field.RequiredIndicator />
              </Field.Label>
              <FileUpload.Root>
                <FileUpload.HiddenInput onChange={handleFileChange} />
                <InputGroup
                  startElement={<FaImage size={18} color="gray.400" />}
                  endElement={
                    <FileUpload.ClearTrigger asChild>
                      <CloseButton
                        size="xs"
                        variant="plain"
                        focusVisibleRing="inside"
                        focusRingWidth="2px"
                        pointerEvents="auto"
                      />
                    </FileUpload.ClearTrigger>
                  }
                >
                  <Input asChild>
                    <FileUpload.Trigger>
                      <FileUpload.FileText lineClamp={1} />
                    </FileUpload.Trigger>
                  </Input>
                </InputGroup>
              </FileUpload.Root>
            </Field.Root>
          </Box>

          {/* Description */}
          <Box bg={sectionBg} p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="gray.800">
              Description
            </Heading>
            <Field.Root required>
              <Field.Label>
                University Description <Field.RequiredIndicator />
              </Field.Label>
              <Textarea
                value={universityData.description}
                onChange={(e) =>
                  setUniversityData({
                    ...universityData,
                    description: e.target.value,
                  })
                }
                placeholder="Provide a detailed description of the university..."
                rows={4}
                bg="white"
                _focus={{
                  bg: "white",
                  borderColor: "brand.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                }}
              />
            </Field.Root>
          </Box>

          {/* Programs */}
          <Box bg={sectionBg} p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="gray.800">
              Academic Programs
            </Heading>
            <VStack spacing={4} align="stretch">
              <HStack>
                <Input
                  value={newProgram}
                  placeholder="Add a program (e.g., Computer Engineering)"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                  onChange={(e) => setNewProgram(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addProgram())
                  }
                />
                <Button
                  bg="teal.500"
                  disabled={!newProgram.trim()}
                  onClick={addProgram}
                >
                  <Plus size={16} />
                  Add
                </Button>
              </HStack>

              {universityData.programs.length > 0 && (
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Programs ({universityData.programs.length})
                  </Text>
                  <HStack flexWrap="wrap" gap={2}>
                    {universityData.programs.map((program) => (
                      <Tag.Root
                        key={program}
                        size="lg"
                        colorPalette="teal"
                        variant="subtle"
                      >
                        <Tag.Label>{program}</Tag.Label>
                        <Tag.CloseTrigger
                          onClick={() => removeProgram(program)}
                          cursor="pointer"
                          _hover={{ color: "red.500" }}
                        >
                          <X size={16} />
                        </Tag.CloseTrigger>
                      </Tag.Root>
                    ))}
                  </HStack>
                </Box>
              )}
            </VStack>
          </Box>

          {/* Facilities */}
          <Box bg={sectionBg} p={6} borderRadius="lg">
            <Heading size="md" mb={4} color="gray.800">
              Campus Facilities
            </Heading>
            <VStack spaceY={4} align="stretch">
              <HStack>
                <Input
                  value={newFacility}
                  placeholder="Add a facility (e.g., Library, Sports Complex)"
                  bg="white"
                  _focus={{
                    bg: "white",
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                  }}
                  onChange={(e) => setNewFacility(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFacility())
                  }
                />
                <Button
                  bg="green.500"
                  variant="subtle"
                  color="white"
                  disabled={!newFacility.trim()}
                  onClick={addFacility}
                >
                  <Plus size={16} />
                  Add
                </Button>
              </HStack>
              {universityData.facilities.length > 0 && (
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Facilities ({universityData.facilities.length})
                  </Text>
                  <HStack flexWrap="wrap" gap={2}>
                    {universityData.facilities.map((facility) => (
                      <Tag.Root
                        key={facility}
                        size="lg"
                        colorPalette="green"
                        variant="subtle"
                      >
                        <Tag.Label>{facility}</Tag.Label>
                        <Tag.CloseTrigger
                          onClick={() => removeFacility(facility)}
                          cursor="pointer"
                          _hover={{ color: "red.500" }}
                        >
                          <X size={16} />
                        </Tag.CloseTrigger>
                      </Tag.Root>
                    ))}
                  </HStack>
                </Box>
              )}
            </VStack>
          </Box>

          <Separator />

          {/* Action Buttons */}
          <HStack spaceX={4} justify="center" pt={4}>
            <Button
              type="submit"
              colorPalette="brand"
              size="lg"
              px={8}
              onClick={handleSubmit}
              disabled={isSaving}
              loading={isSaving}
              loadingText="Saving data..."
              spinnerPlacement="start"
            >
              <Box>
                <BookOpen size={12} />
              </Box>
              Add University
            </Button>
            <Button
              colorPalette="orange"
              variant="subtle"
              size="lg"
              onClick={onCancel}
              px={8}
            >
              <X size={20} />
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddUniversityForm;
