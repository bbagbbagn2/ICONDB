import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuthStore } from "./stores/authStore";
import { NotificationProvider } from "./components/common/NotificationContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostPage from "./pages/PostPage";
import UploadPage from "./pages/UploadPage";
import SearchingPage from "./pages/SearchingPage";
import SearchingTagPage from "./pages/SearchingTagPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

function App() {
  // 앱 초기 로드 시 인증 상태 초기화
  useEffect(() => {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    initializeAuth();
  }, []);
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* 공개 페이지 */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/post/:url_id" element={<PostPage />} />
            <Route path="/searching/:keyword" element={<SearchingPage />} />
            <Route path="/searching/tag/:tag" element={<SearchingTagPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

            {/* 보호된 페이지 (로그인 필수) */}
            <Route
              path="/upload"
              element={<ProtectedRoute Component={UploadPage} />}
            />
            <Route
              path="/editprofile"
              element={<ProtectedRoute Component={EditProfilePage} />}
            />

            {/* 404 페이지 (항상 마지막) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
