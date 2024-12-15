import {  BrowserRouter ,  Route,  Routes} from "react-router-dom";
import Darkmode from 'darkmode-js';
import Login from "./login";
import Dashboard from "./userPanel/Dashboard";
import AdminDashboard from "./adminPanel/AdminDashboard";
import CreateUser from "./adminPanel/pages/CreateUser";
import AssignTask from "./adminPanel/pages/AssignTask";
import ShowTask from "./adminPanel/pages/ShowTask";
import ShowUsers from "./adminPanel/pages/ShowUsers";
import { useEffect } from "react";
import ChangePassword from "./userPanel/pages/ChangePassword";
import ShowUserTask from "./userPanel/pages/ShowTask";
const App = () => {
  useEffect(() => {
    const options = {
      marginTop: '32px',
      top: '32px',
      bottom: 'unset',
      right: '32px',
      left: 'unset',
      time: '0.5s',
      zIndex: '10000',
      mixColor: '#fff',
      backgroundColor: '#fff',
      buttonColorDark: '#fffc',
      buttonColorLight: '#000',
      saveInCookies: false,
      label: '🌜',
      toggleButton: true,
      autoMatchOsTheme: true
    };
     
    const darkmode = new Darkmode(options);
    darkmode.showWidget();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
        <Route index element={<ShowUserTask/>}/>
        <Route path="changePassword" element={<ChangePassword/>}/>
        <Route path="showUserTask" element={<ShowUserTask/>}/>
        </Route>
        <Route path="/adminDashboard" element={<AdminDashboard />} >
          <Route index element={<ShowTask/>}/>
          <Route path="showTask" element={<ShowTask />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="assignTask" element={<AssignTask />} />
          <Route path="showUsers" element={<ShowUsers/>}/>      
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;