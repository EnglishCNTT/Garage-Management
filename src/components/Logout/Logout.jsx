import React from 'react';
import './Logout.css';
import profile_avt from './asset/img/profile_img.png';
import Header_avt from '../Header/asset/img/avt2.jpg';
import Logout_img from './asset/img/logout_img.png';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

function Logout() {
  const auth = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <div className="container" style={{ zIndex: 1 }}>
      <div className="Logout_UI">
        {/* <div className="logout_item1"></div> */}
        <button
          className="logout_item1"
          onClick={() => {
            nav('/view_profile');
          }}
        >
          <img className="logout_avt" src={profile_avt}></img>
          <p className="item1_text">My profile</p>
        </button>

        <div className="logout_item2">
          <button
            className="Logout_button"
            onClick={() => {
              auth.logout();
              nav('/');
            }}
          >
            <img className="logout_img" src={Logout_img}></img>
            <div className="Logout_text">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
