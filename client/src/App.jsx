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
const App = () => {
  useEffect(() => {
    const options = {
      marginTop: '32px',
      top: '32px',
      bottom: 'unset',
      right: '32px',
      left: 'unset',
      time: '0.5s',
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} >
          <Route path="createUser" element={<CreateUser />} />
          <Route path="assignTask" element={<AssignTask />} />
          <Route path="showtask" element={<ShowTask/>}/>    
          <Route path="showUsers" element={<ShowUsers/>}/>    
                
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;