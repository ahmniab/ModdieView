import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignUpPage, RoomPage } from "./pages";
import GlobalToaster from "./components/GlobalToaster";

const App: React.FC = () => {
  return (
    <>
      <GlobalToaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </>
  );
};

export default App;