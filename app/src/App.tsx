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
import { Routes, Route, Link } from "react-router-dom";
import Login from "./layout/login"
import RegisterClient from "./layout/registerReviewer"
import CriticReviews from "./layout/criticReviews"
import UserReviews from "./layout/userReviews"
import Home from "./layout/home"
import BrowseGames from "./layout/browseGames"
import NotFound from "./layout/notFound"
import GamePreview from "./layout/gamePreview"
import GameReview from "./layout/gameReview"
import SuccessfullPost from "./layout/succesFullBlogPost"
import PostView from "./layout/postView"
import CriticCommentView from "./layout/criticCommentView"
import ReviewerComments from "./layout/reviewerComments"

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
          <Route path="/reviews/users" element={<UserReviews />} />
          <Route path="/games" element={<BrowseGames />} />
          <Route path="/games/preview" element={<GamePreview />} />
          <Route path="/games/review" element={<GameReview />} />
          <Route path="/games/review/success" element={<SuccessfullPost />} />
          <Route path="/post/view" element={<PostView />} />
          <Route path="/post/review/critic" element={<CriticCommentView />} />
          <Route path="/critic/reviews" element={<ReviewerComments />} />

        </Routes>

        </VStack>
      </Grid>
    </Box>

    <Footer />
    

  </ChakraProvider>
)
