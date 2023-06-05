import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import './style.css';
import updateProfileAPI from '../../shared/api/updateProfileAPI';
// import "./global.scss";
import changeavt from './Camera/undefined/Vector.png';

const ImageUpload = ({
  handleUploadImage,
  className = 'img-profile',
  filesPath,
  uploadContent,
  onRemoveImage,
  accept = 'image/*',
}) => {
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = img => {
    const reader = new FileReader();
    reader.onload = function () {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const removeImage = () => {
    setImageUrl('');
    handleUploadImage('');
    onRemoveImage && onRemoveImage();
  };

  const props = {
    name: 'image',
    beforeUpload: () => {
      return false;
    },
    showUploadList: false,
    onChange: info => {
      handleUploadImage(info.file);
      getBase64(info.file);
    },
    accept,
  };

  useEffect(() => {
    setImageUrl(filesPath);
    console.log('filesPath', filesPath);
  }, [filesPath]);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      let params = {
        populate: 'role,avatar',
      };

      try {
        const response = await updateProfileAPI.getProfileData(params);
        setAvatar(response.avatar.formats.small.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const renderUploadContent = () => {
    if (uploadContent) return uploadContent;
    return (
      <div>
        <div>
          <img className='imgchange' src={changeavt} alt="" />
        </div>
      </div>
    );
  };

  const renderInputUpload = () => {
    return (
      <Upload {...props} listType="picture-card" className={className}>
        {renderUploadContent()}
      </Upload>
    );
  };

  return (
    // <div>
    //   {!imageUrl ? (

    //     (renderInputUpload(),
    //     (<img src={avatar ? `http://localhost:1337${avatar}` : ''} alt="" />))
    //   ) : (
    //     <div>
    //       <div>
    //         <span>
    //           <img src={imageUrl} alt="" />
    //         </span>
    //       </div>
    //       <span>
    //         <button className="remove-img" type="button" onClick={removeImage}>
    //           X
    //         </button>
    //       </span>
    //     </div>
    //   )}
    // </div>
    <div className="image-container">
      {!imageUrl ? (
        <div className="image-wrapper">
          {renderInputUpload()}
          {avatar && <img src={`http://localhost:1337${avatar}`} alt="" />}
        </div>
      ) : (
        <div>
          <div>
            <span>
              <img src={imageUrl} alt="" />
            </span>
          </div>
          <span>
            <button className="remove-img" type="button" onClick={removeImage}>
              X
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
