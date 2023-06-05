import React from 'react';
import Slide_bar from '../../components/Slider_bar';
import DetailService from '../../components/DetailService/index';


 function DetailService_Page() {
  return (
    <div className='DetailService_Page'>
    <Slide_bar>
    <DetailService></DetailService>
    </Slide_bar>
    </div>
  )
}

export default DetailService_Page;
