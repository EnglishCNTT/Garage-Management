import React from 'react';
import Login from './pages/Authorization/Login/index.jsx';
import { Route, Routes } from 'react-router-dom';

import Change_pw_page from './pages/Change_password/index.jsx';
import Update_Page from './pages/Update_page/index.jsx';
import Page_update_owner from './pages/Page_update_owner/Page_update_owner.jsx';
import CreateOwner_page from './pages/CreateOwner_page/index.jsx';
import CreateGarage_page from './pages/CreateGarage_page/index.jsx';
import ViewProfile_page from './pages/ViewProfile_page/index.jsx';
import Garage_Detail from './pages/Garage_Detail/index.jsx';
import GarageOwner from './pages/GarageOwner/index.jsx';
import { AuthRoutes, GuestRoutes } from './middleware/PrivateRoutes.js';
import UpdateService_page from './pages/UpdateService_page/index.jsx';
import Profile_page from './pages/ViewProfile_page/index.jsx';
import UpdateManagement from './pages/Page_update_management/Page_update_management.jsx';
import GarageService from './pages/Garage_Service_page/index.jsx';
import DetailService from './pages/DetailService/index.jsx';
import GarageManage_page from './pages/garage_manage_page/index.jsx';
import CreateService from './pages/CreateService/index.jsx';
import Page_manager_details from './pages/Page_garage_manager_details/index.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="/change_password" element={<Change_pw_page />} />
          <Route path="/view_profile" element={<ViewProfile_page />} />
          {/* garage owner */}
          <Route path="/" element={<GarageOwner />} />
          <Route path="/GarageOwner/detail/:id" element={<Garage_Detail />} />
          <Route path="/GarageOwner/create" element={<CreateOwner_page />} />
          <Route
            path="/GarageOwner/update/:id"
            element={<Page_update_owner />}
          />
          {/* garage management */}
          <Route
            path="/GarageManage/details/:id"
            element={<Page_manager_details />}
          />
        </Route>
        <Route path="/GarageManage" element={<GarageManage_page />} />
        <Route path="/GarageManage/create" element={<CreateGarage_page />} />
        <Route path="/GarageManage/update/:id" element={<UpdateManagement />} />
        {/* service */}
        <Route
          path="/GarageService/update/:id"
          element={<UpdateService_page />}
        />
        <Route path="/GarageService" element={<GarageService />} />
        <Route path="/GarageService/details/:id" element={<DetailService />} />
        <Route path="/GarageService/Create" element={<CreateService />} />
        <Route path="/update/:id" element={<Update_Page />} />
      </Routes>
    </div>
  );
}

export default App;
