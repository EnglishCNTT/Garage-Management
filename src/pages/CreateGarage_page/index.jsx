import React from 'react';
import Slide_bar from '../../components/Slider_bar';
import CreateGarage from '../../components/CreateGarage';

import { Breadcrumb } from 'antd';


export default function CreateGarage_page() {
  return (
    <div >
      <Slide_bar>
        <CreateGarage></CreateGarage>
      </Slide_bar>
    </div>
  );
}
