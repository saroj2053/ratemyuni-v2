import React from "react";
import MainNav from "../nav/MainNav";
import MobileNav from "../nav/MobileNav";
import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/university/universitySlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.university.searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== "/universities") {
      navigate("/universities");
    }
  };

  return (
    <header>
      <Box
        bg={"white"}
        boxShadow="md"
        borderColor={"gray.200"}
        borderBottomWidth="1px"
        shadow="sm"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Container maxW="container.xl" py={4}>
          <Flex align="center" justify="space-between">
            <Link to="/">
              <HStack cursor="pointer">
                <Box color="brand.500">
                  <GraduationCap size={32} />
                </Box>
                <Text fontSize="xl" fontWeight="bold" color="brand.600">
                  Nepal Uni Reviews
                </Text>
              </HStack>
            </Link>
            <Box flex="1" maxW="md" mx="8">
              <form onSubmit={handleSearch}>
                <InputGroup
                  startElement={
                    <Box color="brand.500">
                      <Search size={18} />
                    </Box>
                  }
                >
                  <Input
                    value={searchQuery}
                    onChange={(e) => {
                      dispatch(setSearchQuery(e.target.value));
                    }}
                    placeholder="Search universities, programs, locations..."
                    bg="gray.50"
                    borderWidth="1px"
                    borderColor="gray.200"
                    _focus={{
                      bg: "white",
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </InputGroup>
              </form>
            </Box>
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <div className="hidden lg:block">
              <MainNav />
            </div>
          </Flex>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
