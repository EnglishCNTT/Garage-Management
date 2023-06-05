import React from "react";
import Slide_bar from "../../components/Slider_bar";
import Update_Profile from "../../components/Update_Profile";


function Update_Page() {
    return (
        <div className="Update_page">
            <Slide_bar>
                <Update_Profile></Update_Profile>
            </Slide_bar>
        </div>

    );
}

export default Update_Page;