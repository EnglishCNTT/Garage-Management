import React from 'react';
import Slide_bar from '../../components/Slider_bar';
import CreateService from '../../components/CreateService/createService.jsx';
import { Breadcrumb } from 'antd';

function CreateServive() {
  return (
    <div className="CreateServive>">
      <Slide_bar>
        <CreateService></CreateService>
      </Slide_bar>
    </div>
  );
}

export default CreateServive;
