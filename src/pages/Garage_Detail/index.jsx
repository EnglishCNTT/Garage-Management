import React from "react";
import Slide_bar from "../../components/Slider_bar";
import Garage_detail from "../../components/Garage_Details";

function Garage_detail_page() {
    return (
        <div className="Profile_page">
            <Slide_bar>
                <Garage_detail></Garage_detail>
            </Slide_bar>
        </div>
    );

}

export default Garage_detail_page;