import React, { useEffect } from 'react';
import { Input, message } from 'antd';
import { useForm, Controller, set } from 'react-hook-form';
import styles from './styles.module.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import updateServiceAPI from '../../shared/api/updateServiceAPI';
import { useNavigate } from 'react-router-dom';

export default function UpdateService() {
  const nav = useNavigate();
  let { id } = useParams();
  const { TextArea } = Input;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      minPrice: '',
      maxPrice: '',
      description: '',
    },
  });

  // call api id to get data

  const [dataID, setDataID] = useState([]);
  const [minPrice, setMinPrice] = useState('');

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await updateServiceAPI.getDataFromId(id);

      setDataID(response.data);
      setMinPrice(response.data.attributes.minPrice);
      console.log(id);
      console.log(11, response.data.attributes.name);
      setValue('name', response.data.attributes.name);
      setValue('minPrice', response.data.attributes.minPrice);
      setValue('maxPrice', response.data.attributes.maxPrice);
      setValue('description', response.data.attributes.description);

      // ...
    }
    fetchData();
  }, [id]);

  console.log(dataID);
  console.log(dataID);

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
      nav('/GarageService');
    }, 2000);
  };

  const onSubmit = object => {
    const data = {
      name: object.name,
      description: object.description,
      minPrice: object.minPrice,
      maxPrice: object.maxPrice,
    };
    console.log(111, id);
    console.log(object);
    updateService({ data }, id);
  };

  const updateService = async (data, idNumber) => {
    try {
      const res = await updateServiceAPI.updateServiceData(idNumber, data);
      openMessageAuke();
      console.log(res);
      console.log(res.data);
    } catch (error) {
      openMessageErr();
    }
  };

  return (
    <>
      <div
        style={{ width: '100%', backgroundColor: '#f8f5f5', padding: '10px' }}
      >
        <h3 style={{ fontFamily: 'Poppins', fontSize: 20 }}>
          <span
            style={{ fontFamily: 'Poppins', fontSize: '23', color: '#cacaca' }}
          >
            All Services &gt;
          </span>{' '}
          {dataID.attributes?.name}{' '}
        </h3>
      </div>
      <div className={styles['update-form']}>
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
                    placeholder="Enter service name"
                  />
                )}
              />
              {errors.name && (
                <p style={{ color: 'red' }}>Please enter service name</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Min price <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="minPrice"
                control={control}
                rules={{ required: true, pattern: /^[0-9]*$/ }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter min price"
                  />
                )}
              />
              {errors.minPrice && (
                <p style={{ color: 'red' }}>Please enter a valid min price</p>
              )}
            </div>
            <div className={styles['row-item']}>
              <label htmlFor="" className={styles['title-label']}>
                Max price <span style={{ color: 'red' }}>*</span>{' '}
              </label>
              <Controller
                name="maxPrice"
                control={control}
                rules={{ required: true, pattern: /^[0-9]*$/ }}
                render={({ field }) => (
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter max price"
                  />
                )}
              />
              {errors.maxPrice && (
                <p style={{ color: 'red' }}>Please enter a valid max price</p>
              )}
            </div>
          </div>
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
                  style={{ width: '100%' }}
                  {...field}
                />
              )}
            />
            {errors.description && (
              <p style={{ color: 'red' }}>Please enter a description</p>
            )}
          </div>
          <hr style={{ width: '100%' }} />
          <div className={styles['btn-container']}>
            <button type="submit" className={styles['btn-save']}>
              Save
            </button>
            <Link to="/GarageService">
              <button type="cancel" className={styles['btn-cancel']}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
