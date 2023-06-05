import React from 'react';
import Slide_bar from '../../components/Slider_bar';
import UpdateService from '../../components/UpdateService';
import { Breadcrumb } from 'antd';


function UpdateService_page() {
  return (
    <div className="UpdateService_page">
      <Slide_bar>
        <UpdateService></UpdateService>
      </Slide_bar>
    </div>
  );
}

export default UpdateService_page;
