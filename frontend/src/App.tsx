import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/signup"
          element={
            <AuthRoute isProtected={false}>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <AuthRoute isProtected={false}>
              <Signin />
            </AuthRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <AuthRoute isProtected={true}>
              <Blog />
            </AuthRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <AuthRoute isProtected={true}>
              <Blogs />
            </AuthRoute>
          }
        />
        <Route
          path="/publish"
          element={
            <AuthRoute isProtected={true}>
              <Publish />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
