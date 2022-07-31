import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { SharedLayout } from "./components/sharedLayout";
import { Home } from "./components/Home.js";
import { SignUp } from "./components/SignUp.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { Dashboard } from "./components/Dashboard.js";
import { AllPass } from "./components/AllPass.js";
let prevUser;
if (localStorage.getItem("user") != null) {
  prevUser = JSON.parse(localStorage.getItem("user"));
}
function App() {
  const [user, setUser] = useState(prevUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout user={user} />}>
          <Route index element={<Home setUser={setUser} />} />

          <Route path="/changePassword" element={<SignUp />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/allPass"
          element={
            <ProtectedRoute user={user}>
              <AllPass user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
