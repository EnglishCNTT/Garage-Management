import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../shared/services/http-client';
// import moment from 'moment/moment';
import { useForm, Controller } from 'react-hook-form';
import ImageUpload from './input';
import {
  Avatar as AntAvatar,
  Form,
  Input,
  Button,
  // Row,
  // Col,
  message,
  // Select,
  Modal,
} from 'antd';
import { ReactComponent as Ellipse3 } from './Camera/Ellipse 3.svg';
import { ReactComponent as Camera } from './Camera/Vector.svg';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './style.css';
import updateProfileAPI from '../../shared/api/updateProfileAPI';

const AvatarContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

const Avatar = styled(AntAvatar)`
  position: absolute;
  top: 0;
  left: 0;
`;

const AvatarImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const CameraAvatar = styled(Avatar)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #eeeeee;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const BlackClover = styled(AntAvatar)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

function UpdateProfile() {
  let { id } = useParams();
  const nav = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      username: '',
      phoneNumber: '',
      dob: '',
      role: '',
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // const { Option } = Select;
  const navigate = useNavigate();

  console.log('myid', id);

  const [myUser, setMyUser] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      let params = {
        populate: 'role,avatar',
      };

      try {
        const response = await updateProfileAPI.getProfileData(params);
        setAvatar(response.avatar.formats.small.url);
        setMyUser(response);
        setValue('fullname', response.fullname);
        setValue('email', response.email);
        setValue('username', response.username);
        setValue('phoneNumber', response.phoneNumber);
        setValue('dob', dayjs(response.dob));
        setValue('role', response.role.name);
        console.log(22222, response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  // Notification
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessageErr = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Fail! Please try again! ',
        duration: 2,
      });
    }, 1000);
  };
  const openMessageAuke = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Success! You have created a new owner! ',
        duration: 2,
      });
    }, 1000);

    setTimeout(() => {
      nav('/');
    }, 2000);
  };

  console.log('myUser', myUser);

  const handleCancelForm = () => {
    navigate('/');
  };

  const updateDataProfile = async (data, idNumber) => {
    try {
      const res = await updateProfileAPI.updateProfileData(data, idNumber);
      console.log('res', res);
      openMessageAuke();
    } catch (error) {
      console.log(error);
      openMessageErr();
    }
  };

  const onSubmit = data => {
    const IdUpdate = id;
    data.dob = data.dob.format('YYYY-MM-DD');
    // remove username
    delete data.username;
    // remove role
    delete data.role;
    // remove email
    delete data.email;
    console.log('data', data);
    try {
      const res = updateProfileAPI.updateAvatar(fileUpload, id);
      console.log('resavt', res);
    } catch (error) {
      console.log(error);
    }

    updateDataProfile(data, IdUpdate);
  };

  const [fileUpload, setFileUpload] = useState(null);
  const handleUploadImage = file => {
    console.log({ file });
    setFileUpload(file);
  };

  const handleRemoveImage = () => { };

  console.log('fileUpload', fileUpload);

  return (
    <div className="full">
      {contextHolder}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper">
          <div className="container">
            <div className="profile">
              <div className="image">
                <div className="image-wrapper">
                  <ImageUpload
                    handleUploadImage={handleUploadImage}
                    onRemoveImage={handleRemoveImage}
                    defaultImage={avatar}
                  />
                </div>
              </div>
              <div className="infor">
                <div className="form-items">
                  <label htmlFor="">Name</label>
                  <Controller
                    name="fullname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Enter your name"
                      />
                    )}
                  />
                </div>
                <div className="form-items">
                  <label htmlFor="">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Enter your email"
                        disabled
                      />
                    )}
                  />
                </div>
                <div className="form-items">
                  <label htmlFor="">Username</label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        placeholder="Enter your username"
                        disabled
                      />
                    )}
                  />
                </div>
                <div className="dob-phone">
                  <div className="form-items-dob">
                    <label htmlFor="">DOB</label>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <DatePicker {...field} size="large" />
                      )}
                    />
                  </div>
                  <div className="form-items-phone">
                    <label htmlFor="">Phone Number</label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          size="large"
                          placeholder="Enter your phone number"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="form-items">
                  <label htmlFor="">Address</label>
                  <Input size="large" value={'Hà Nội'} disabled />
                </div>
                <div className="form-items">
                  <label htmlFor="">Role</label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} size="large" disabled />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-u">
          <div className="line"></div>
          <div className="container.container_updateProfile_button">
            <Form.Item>
              <button className="button_update" type="submit" htmlType="submit">
                Update
              </button>
              <button onClick={handleCancelForm} className="button_cancel">
                Cancel
              </button>
            </Form.Item>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
