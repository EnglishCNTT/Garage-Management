import React from 'react';
import Update_Managetment from '../../components/Update_Garage_Management/Header_update/update_managetment.jsx';
import Footer_Managetment from '../../components/Update_Garage_Management/Footer_Update/Footer_update_management.jsx';
import Slide_bar from '../../components/Slider_bar';
// import Footer_update_owner from "../../components/Footer_update_owner/Footer_update_owner";

function Page_update_management() {
  return (
    <Slide_bar>
      <Update_Managetment></Update_Managetment>
      {/* <Footer_Managetment></Footer_Managetment> */}
    </Slide_bar>
  );
}
export default Page_update_management;
