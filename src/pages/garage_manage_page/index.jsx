import Tablemanage from '../../components/TableManage/index.jsx'
import React from "react";
import Slide_bar from "../../components/Slider_bar";

function GarageManage_page() {
    return (
        <div className="GarageManage_page" >


            <Slide_bar>

                <div style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12 }}>


                    <Tablemanage />
                </div>
            </Slide_bar>

        </div>
    );
}
export default GarageManage_page;