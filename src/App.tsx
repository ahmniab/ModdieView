import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignUpPage, CreateRoomPage } from "./pages";
import GlobalToaster from "./components/GlobalToaster";

const App: React.FC = () => {
  return (
    <>
      <GlobalToaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/room/new" element={<CreateRoomPage />} />
      </Routes>
    </>
  );
};

export default App;