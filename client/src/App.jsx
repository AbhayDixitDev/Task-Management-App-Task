import {  BrowserRouter ,  Route,  Routes} from "react-router-dom";
import Login from "./login";
import Dashboard from "./userPanel/Dashboard";
import AdminDashboard from "./adminPanel/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} >
          <Route path="/createUser" element={<Dashboard />} />
          <Route path="/assignTask" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;