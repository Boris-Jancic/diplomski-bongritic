import * as React from "react"
import {
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/provider"
import { Logo } from "./Logo"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import { Routes, Route, Link } from "react-router-dom";
import Login from "./layout/login"
import RegisterClient from "./layout/registerClient"
import CriticReviews from "./layout/criticReviews"
import UserReviews from "./layout/userReviews"
import Home from "./layout/home"

export const App = () => (
  <ChakraProvider theme={theme}>

    <Navbar />

    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews/critics" element={<CriticReviews />} />
          <Route path="/reviews/users" element={<UserReviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterClient />} />
        </Routes>

        </VStack>
      </Grid>
    </Box>

    <Footer />
    

  </ChakraProvider>
)
