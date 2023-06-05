import React from 'react';
import Slide_bar from '../../components/Slider_bar';
import ViewProfile from '../../components/ViewProfile/ViewProfile';

function ViewProfile_page() {
  return (
    <div className="ViewProfile_page">
      <Slide_bar>
        <ViewProfile></ViewProfile>
      </Slide_bar>
    </div>
  );
}

export default ViewProfile_page;
