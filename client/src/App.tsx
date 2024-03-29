import * as React from "react"
import {
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/provider"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import { Routes, Route } from "react-router-dom";
import Login from "./layout/login"
import RegisterClient from "./layout/registerCritic"
import CriticReviews from "./layout/criticReviews"
import Home from "./layout/home"
import NotFound from "./layout/notFound"
import SuccessfullPost from "./layout/succesFullBlogPost"
import PostView from "./layout/postView"
import CriticCommentView from "./layout/criticCommentView"
import ReviewerComments from "./layout/criticComments"
import AboutUs from "./layout/aboutUs"
import UserComments from "./layout/userComments"

export const App = () => (
  <ChakraProvider theme={theme}>

    <Navbar />

    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>

        <Routes>

          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterClient />} />

          <Route path="/reviews/critics" element={<CriticReviews />} />

          <Route path="/games/review/success" element={<SuccessfullPost />} />

          <Route path="/post/view" element={<PostView />} />
          <Route path="/post/review/critic" element={<CriticCommentView />} />

          <Route path="/critic/reviews" element={<ReviewerComments />} />

          <Route path="/user/reviews" element={<UserComments />} />
          
          <Route path="/about" element={<AboutUs />}></Route>

        </Routes>

        </VStack>
      </Grid>
    </Box>

    <Footer />
    

  </ChakraProvider>
)
