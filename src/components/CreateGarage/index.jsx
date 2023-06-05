import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Checkbox } from 'antd';
import binicon from './Vector.svg';
import styles from './styles.module.css';
import { Option } from 'antd/es/mentions';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import createGarageAPI from '../../shared/api/createGarageAPI';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CreateGarage() {
  const nav = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      status: '',
      phoneNumber: '',
      email: '',
      openTime: '',
      closeTime: '',
      description: '',
      policy: '',
      owner: '',
      services: [],
    },
  });

  const { TextArea } = Input;

  // notification
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
        content: 'Success! You have created a new garage! ',
        duration: 2,
      });
    }, 1000);

    setTimeout(() => {
      nav('/GarageManage');
    }, 2000);
  };
  // choose garage
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const onChangeBox = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedBoxes([...checkedBoxes, value]);
    } else {
      setCheckedBoxes(checkedBoxes.filter(item => item !== value));
    }
  };

  // delete garage
  const handleDelete = item => {
    setCheckedBoxes(checkedBoxes.filter(checked => checked !== item));
  };

  const onSubmit = object => {
    object.services = checkedBoxes;
    const data = {
      name: object.name,
      address: object.address,
      status: object.status,
      phoneNumber: object.phoneNumber,
      email: object.email,
      openTime: object.openTime,
      closeTime: object.closeTime,
      description: object.description,
      policy: object.policy,
      owner: object.owner,
      services: object.services,
    };
    console.log(object, 111);
    console.log(data, 222);
    createGarage({ data });
  };

  // search garage
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerList, setOwnerList] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  // Call API garage-service list
  useEffect(() => {
    const fetchGarageServiceList = async () => {
      try {
        let params = {};
        params['filters[name][$contains]'] = searchTerm;
        const res = await createGarageAPI.getGarageServiceList(params);
        setFilteredServices(res.data);
      } catch (error) {
        console.log('Failed to fetch garage service list: ', error);
      }
    };

    // Set up a timeout variable
    const debounceTimer = setTimeout(() => {
      console.log(`Searching for "${searchTerm}"...`);
      // Call your search function here
      fetchGarageServiceList();
    }, 3000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);
  console.log('service', filteredServices);

  useEffect(() => {
    const fetchOwnerList = async () => {
      try {
        const res = await createGarageAPI.getOwnerList();
        setOwnerList(res);
      } catch (error) {
        console.log('Failed to fetch owner list: ', error);
      }
    };
    fetchOwnerList();
  }, []);

  // Search garage service

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Post data to API

  const createGarage = async data => {
    try {
      const res = await createGarageAPI.postGarageData(data);
      openMessageAuke();
      console.log(res);
      console.log(res.data);
    } catch (error) {
      openMessageErr();
    }
  };

  return (
    <div className={styles['create-form']}>
      {contextHolder}
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={styles['form-container']}
      >
        <div className={styles['form-row']}>
          <div className={styles['row-item']}>
            <label htmlFor="" className={styles['title-label']}>
              Name <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: '100%' }}
                  size="large"
                  placeholder="Enter garage name"
                />
              )}
            />
            {errors.name && (
              <p style={{ color: 'red' }}>Please enter your name</p>
            )}
          </div>
          <div className={styles['row-item']}>
            <label htmlFor="" className={styles['title-label']}>
              Email <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }) => (
                <Input
                  size="large"
                  {...field}
                  placeholder="Enter garage email"
                />
              )}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>Please enter a valid email address</p>
            )}
          </div>
          <div className={styles['row-item']}>
            <label htmlFor="" className={styles['title-label']}>
              Phone number <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: true, minLength: 10, maxLength: 10 }}
              render={({ field }) => (
                <Input
                  size="large"
                  {...field}
                  placeholder="Enter phone number"
                />
              )}
            />
            {errors.phone && (
              <p style={{ color: 'red' }}>Please enter a valid phonenumber</p>
            )}
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['row-item']}>
            <label htmlFor="" className={styles['title-label']}>
              Address <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: '100%' }}
                  size="large"
                  placeholder="Enter garage address"
                />
              )}
            />
            {errors.password && (
              <p style={{ color: 'red' }}>Please enter a valid address</p>
            )}
          </div>
          <div className={styles['row-item']}>
            <label htmlFor="" className={styles['title-label']}>
              Open time <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="openTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  size="large"
                  {...field}
                  placeholder="Select open time"
                  allowClear
                >
                  <Option value="07:00:00">07:00:00</Option>
                  <Option value="09:00:00">09:00:00</Option>
                  <Option value="11:00:00">11:00:00</Option>
                </Select>
              )}
            />
            {errors.openTime && (
              <p style={{ color: 'red' }}>Please select openTime</p>
            )}
          </div>
          <div className={styles['row-item']}>
            <label htmlFor="" className={styles['title-label']}>
              Close time <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="closeTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  size="large"
                  {...field}
                  placeholder="Select close time"
                  allowClear
                >
                  <Option value="18:00:00">18:00:00</Option>
                  <Option value="20:00:00">20:00:00</Option>
                  <Option value="22:00:00">22:00:00</Option>
                </Select>
              )}
            />
            {errors.closeTime && (
              <p style={{ color: 'red' }}>Please select closeTime</p>
            )}
          </div>
        </div>
        <div className={styles['form-row-last']}>
          <div className={styles['row-item-last']}>
            <label htmlFor="" className={styles['title-label']}>
              Garage owner <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="owner"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  size="large"
                  placeholder="Select a garage owner"
                  {...field}
                  allowClear
                >
                  {ownerList.map(owner => (
                    <Option key={owner} value={owner.id}>
                      {owner.fullname}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.owner && (
              <p style={{ color: 'red' }}>Please select garage owner</p>
            )}
          </div>
          <div className={styles['row-item-last']}>
            <label htmlFor="" className={styles['title-label']}>
              Status <span style={{ color: 'red' }}>*</span>{' '}
            </label>
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  placeholder="Select a Status"
                  allowClear
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              )}
            />
            {errors.status && (
              <p style={{ color: 'red' }}>Please select status</p>
            )}
          </div>
        </div>
        <div className={styles['textarea-form']}>
          <div className={styles['description-form']}>
            <label htmlFor="">
              Description <span className={styles['red-require']}>*</span>
            </label>
            <br />
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea
                  rows={5}
                  placeholder="Enter a description"
                  maxLength={10}
                  style={{ width: '100%', fontSize: '16px' }}
                  {...field}
                />
              )}
            />
            {errors.description && (
              <p style={{ color: 'red' }}>Please enter a description</p>
            )}
          </div>
          <div className={styles['policy-form']}>
            <label htmlFor="">
              Policy <span className={styles['red-require']}>*</span>
            </label>
            <br />
            <Controller
              name="policy"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextArea
                  rows={5}
                  placeholder="Enter a policy"
                  maxLength={10}
                  style={{ width: '100%', fontSize: '16px' }}
                  {...field}
                />
              )}
            />
            {errors.policy && (
              <p style={{ color: 'red' }}>Please enter a policy</p>
            )}
          </div>
        </div>

        <div className={styles['choose-container']}>
          <div className={styles['checkbox-garage']}>
            <Input
              size="large"
              placeholder="Search for service .."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className={styles['checkbox-list']}>
              {filteredServices.map(serviceName => (
                <Checkbox
                  key={serviceName}
                  style={{ marginLeft: '8px' }}
                  onChange={onChangeBox}
                  value={serviceName.id}
                  checked={checkedBoxes.includes(serviceName.id)}
                >
                  {serviceName.attributes?.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className={styles['list-garage']}>
            <label htmlFor="">Select services ({checkedBoxes.length})</label>
            {checkedBoxes.map(item => {
              const IDObject = filteredServices.find(obj => obj.id === item);
              console.log(IDObject);
              return (
                <div className={styles['pickitem']} key={item}>
                  <div className="pickitem-name">
                    {IDObject.attributes?.name}
                  </div>
                  <img
                    src={binicon}
                    alt=""
                    onClick={() => handleDelete(item)}
                    style={{ cursor: 'pointer', marginLeft: '5px' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className={styles['btn-container']}>
          <button type="submit" className={styles['btn-save']}>
            Save
          </button>
          <Link to="/GarageManage">
            <button type="cancel" className={styles['btn-cancel']}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateGarage;
