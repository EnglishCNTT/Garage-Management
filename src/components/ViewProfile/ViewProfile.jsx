import React, { useEffect } from 'react';
import styles from './ViewProfile.module.css';
import { Link } from 'react-router-dom';
import viewProfileAPI from '../../shared/api/viewProfileAPI';
import { useState } from 'react';

export default function ViewProfile(props) {
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
        console.log(22222, response);
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

  const id = userInfo.id;
  console.log(id);

  return (
    <>
      <div
        style={{ width: '100%', backgroundColor: '#f8f5f5', padding: '10px' }}
      >
        <h3 style={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: '500' }}>
          My Profile{' '}
        </h3>
      </div>
      <div className={styles['container-view']}>
        <div className={styles['pf-container']}>
          <div className={styles['avatar']}>
            <img className={styles['img_view_profile']} src={linkAvatar} />
          </div>
          <div className={styles['info-wrapper']}>
            <div className={styles['info-left']}>
              <div className={styles['title']}>
                <label htmlFor="">Name</label>
                <h1>{userInfo?.fullname}</h1>
              </div>

              <div className={styles['title']}>
                <label htmlFor="">Phone Number</label>
                <h1>{userInfo?.phoneNumber}</h1>
              </div>

              <div className={styles['title']}>
                <label htmlFor="">Address</label>
                <h1>Cau Giay, Ha Noi</h1>
              </div>
            </div>
            <div className={styles['info-right']}>
              <div className={styles['title']}>
                <label htmlFor="">Email</label>
                <h1>{userInfo?.email}</h1>
              </div>

              <div className={styles['title']}>
                <label htmlFor="">DOB</label>
                <h1>{userInfo?.dob}</h1>
              </div>

              <div className={styles['title']}>
                <label htmlFor="">Role</label>
                <h1>{userInfo?.role?.name}</h1>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles['buttons']}>
          <button className={styles['update-btn']}>
            <Link to={`/update/${1}`}>Update Profile</Link>
          </button>
          <button className={styles['change-btn']}>
            <Link to="/change_password">Change Password</Link>
          </button>
        </div>
      </div>
    </>
  );
}
