import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import SearchingPage from "./pages/SearchingPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/post/:url_id" element={<PostPage />} />
        <Route exact path="/searching/:keyword" element={<SearchingPage />} />

        <Route exact path="/upload" element={<UploadPage />} />
        <Route exact path="/profile/:user" element={<ProfilePage />} />
        <Route exact path="/editprofile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
