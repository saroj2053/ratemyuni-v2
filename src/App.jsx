import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "./components/ui/toaster";
import SignupPage from "./pages/SignupPage";
import { Box, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import UniversityListPage from "./pages/UniversityListPage";
import AddUniversityPage from "./pages/AddUniversityPage";
import { API_BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./features/user/userSlice";
import { GraduationCap } from "lucide-react";
import ProfilePage from "./pages/ProfilePage";
import UniversityDetailsPage from "./pages/UniversityDetailsPage";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const response = await fetch(API_BASE_URL + "/auth/loggedUser/profile", {
        method: "GET",
        credentials: "include", // Ensuring cookies are sent with the request
      });
      console.log(response);

      const data = await response.json();
      console.log(data);
      dispatch(addUser(data.loggedInUser));
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <VStack spaceY={2} align="center">
          <Spinner
            color="brand.500"
            size="xl"
            css={{ "--spinner-track-color": "colors.gray.200" }}
          />
          <HStack cursor="pointer">
            <Box color="brand.500">
              <GraduationCap size={32} />
            </Box>
            <Text fontSize="xl" fontWeight="bold" color="brand.600">
              Nepal Uni Reviews
            </Text>
          </HStack>
        </VStack>
      </div>
    );

  return (
    <>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Toaster />
        <Header />
        <Box flex="1">
          <Routes>
            {/* Defining routes here */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/universities" element={<UniversityListPage />} />
            <Route path="/add-university" element={<AddUniversityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/university/:id" element={<UniversityDetailsPage />} />
            {/* Adding error route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default App;
