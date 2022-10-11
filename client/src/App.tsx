import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./components/Auth/NotFound";
import AuthContextProvider from "./contexts/authContext";
import ConversationContextProvider from "./contexts/conversationContext";
import MessageContextProvider from "./contexts/messageContext";
import PeopleContextProvider from "./contexts/peopleContext";
import ProtectedRoute from "./routing/ProtectedRoute";
import Auth from "./views/Auth/Auth";
import Login from "./views/Auth/Login";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <AuthContextProvider>
      <PeopleContextProvider>
        <ConversationContextProvider>
          <MessageContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route path="/" element={<Login />} />
                  <Route
                    path="register"
                    element={<Auth bodyType="register" />}
                  />
                  <Route path="verify/:userId/:verifyString" element={<Auth bodyType="verify" />} />
                  <Route
                    path="identify"
                    element={<Auth bodyType="identify" />}
                  />
                  <Route
                    path="resetpassword"
                    element={<Auth bodyType="resetpassword" />}
                  />
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="t"
                      element={<Dashboard dashboardRoute="chats" />}
                    >
                      <Route
                        path=":conversationId"
                        element={<Dashboard dashboardRoute="chats" />}
                      />
                    </Route>
                    <Route
                      path="active"
                      element={<Dashboard dashboardRoute="people" />}
                    />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </MessageContextProvider>
        </ConversationContextProvider>
      </PeopleContextProvider>
    </AuthContextProvider>
  );
}

export default App;
