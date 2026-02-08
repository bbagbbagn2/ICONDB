import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotificationProvider } from "./components/common/NotificationContext";
import ScrollToTop from "./components/common/ScrollToTop";
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
    <NotificationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/post/:url_id" element={<PostPage />} />
          <Route path="/searching/:keyword" element={<SearchingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/profile/:user" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
