import React, { useState } from 'react';
import menu_icon from '../Header/asset/img/Menu_icon.png';
import Header_avt from '../Header/asset/img/avt2.jpg';
import Logout from '../Logout/Logout';
import styles from './styles.module.css';
import viewProfileAPI from '../../shared/api/viewProfileAPI';
import { useEffect } from 'react';

function Header_content() {
  // Call API to get user info
  const [userInfo, setUserInfo] = useState([]);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      let params = {
        populate: 'role,avatar',
      };

      try {
        const response = await viewProfileAPI.getMyInfo(params);
        setAvatar(response.avatar.formats.small.url);
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);
  console.log('userInfo', userInfo);

  const host = 'http://localhost:1337';
  const linkAvatar = host + avatar;
  console.log('linkAvatar', linkAvatar);
  const [showLogout, setShowLogout] = useState(false);

  const EClick = () => {
    setShowLogout(!showLogout);
  };

  console.log('avt', Header_avt.width);
  return (
    <div className={styles['container_mini_profile']}>
      <div onClick={EClick} className={styles['header__mini_profile']}>
        <img
          className={styles['header_avt']}
          src={linkAvatar}
          alt="Profile Avatar"
        />
        <div className={styles['header__text']}>
          <p className={styles['header__text1']}>{userInfo.fullname}</p>
          <p className={styles['header__text2']}>{userInfo.role?.name}</p>
        </div>
      </div>

      {showLogout && <Logout style={{}} />}
    </div>
  );
}

export default Header_content;
