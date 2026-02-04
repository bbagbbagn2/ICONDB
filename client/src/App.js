import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import PostPage from "./page/PostPage";
import PostingPage from "./page/PostingPage";
import SearchingPage from "./page/SearchingPage";
import SearchingTagPage from "./page/SearchingTagPage";
import EditProfilePage from "./page/EditProfilePage";
import ProfilePage from "./page/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/searching/:keyword" element={<SearchingPage />} />
        <Route
          exact
          path="/searchingTag/:keyword"
          element={<SearchingTagPage />}
        />
        <Route exact path="/posting" element={<PostingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/post/:url_id" element={<PostPage />} />
        <Route exact path="/profile/:user" element={<ProfilePage />} />
        <Route exact path="/editprofile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
