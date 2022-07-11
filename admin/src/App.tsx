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
import CriticReviews from "./layout/criticReviews"
import UserReviews from "./layout/userReviews"
import Home from "./layout/home"
import BrowseGames from "./layout/browseGames"
import NotFound from "./layout/notFound"
import SuccessfullPost from "./layout/succesFullBlogPost"
import PostView from "./layout/postView"
import CriticCommentView from "./layout/criticCommentView"
import ReviewerComments from "./layout/criticComments"
import AboutUs from "./layout/aboutUs"
import UserComments from "./layout/userComments"
import ReviewerTable from "./layout/tables/reviewerTable"
import NotApprovedReviewerTable from "./layout/tables/notApprovedReviewersTable"
import CommentApprovalTable from "./layout/tables/commentApprovalTable"
import UserTable from "./layout/tables/userTable"

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
          
          <Route path="/reviews/critics" element={<CriticReviews />} />
          <Route path="/reviews/users" element={<UserReviews />} />

          <Route path="/games" element={<BrowseGames />} />
          <Route path="/games/review/success" element={<SuccessfullPost />} />
          
          <Route path="/post/view" element={<PostView />} />
          <Route path="/post/review/critic" element={<CriticCommentView />} />
          
          <Route path="/critic/reviews" element={<ReviewerComments />} />
          <Route path="/critics/view" element={<ReviewerTable />} />
          <Route path="/critics/view/registration" element={<NotApprovedReviewerTable />} />
          <Route path="/critics/comment/approval" element={<CommentApprovalTable />} />
          
          <Route path="/users/view" element={<UserTable />} />
          <Route path="/user/reviews" element={<UserComments />} />
          
          <Route path="/about" element={<AboutUs />}></Route>

        </Routes>

        </VStack>
      </Grid>
    </Box>

    <Footer />
    

  </ChakraProvider>
)
