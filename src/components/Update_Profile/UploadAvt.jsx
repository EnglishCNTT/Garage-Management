const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Lưu đường dẫn ảnh sau khi upload thành công
      setAvatar(info.file.response.avatarUrl);
      setLoading(false);
    }
    if (info.file.status === 'error') {
      message.error('Failed to upload avatar.');
      setLoading(false);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axiosInstance.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // Trả về đường dẫn ảnh sau khi upload thành công
    } catch (error) {
      throw new Error('Failed to upload avatar.');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      // Upload ảnh lên API trước khi gửi dữ liệu cập nhật profile
      if (avatar) {
        const avatarUrl = await uploadAvatar(avatar);
        formData.avatar = avatarUrl;
      }

      // Gửi dữ liệu cập nhật profile lên API
      await axiosInstance.put(`/users/${id}`, formData);
      message.success('Success! You have updated your profile!');
    } catch (error) {
      message.error('Fail! Please try again!');
    }
  };