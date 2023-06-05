import "./index.css";
import React, { useState, useEffect } from "react";
import axiosInstance from '../../shared/services/http-client.js';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.css';


const Index = () => {
  const [garage, setGarage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`garage-services/${id}`)
      .then(res => {
        console.log(res.data); // In dữ liệu API
        if (res.data && res.data.attributes) {
          // Tiếp tục xử lý dữ liệu nếu cần thiết
          const { id, name, description, minPrice, maxPrice, createdAt, updatedAt, publishedAt } = res.data.attributes;
          const garageData = {
            id,
            name,
            description,
            minPrice,
            maxPrice,
            createdAt,
            updatedAt,
            publishedAt
          };
          console.log(garageData); // In dữ liệu đã xử lý (nếu có)
          setGarage(garageData);
        } else {
          console.log("Dữ liệu trả về từ API không hợp lệ");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return (<>
    <div style={{ width: '100%', backgroundColor: '#f8f5f5', padding: '10px' }}>
      <h3 style={{ fontFamily: 'Poppins', fontSize: 20 }}><span style={{ fontFamily: 'Poppins', fontSize: "23", color: '#cacaca' }} >All Services  &gt;</span>  {garage && garage.name}   </h3>
    </div>
    <div className='container-all-detail-service'>

      <div className='container-up-detail-service'>
        <div className='container-up-1-detail-service'>
          <div className='container-up-1-1-detail-service'>
            <div className='letter' style={{ fontWeight: 'bold' }} >
              Name
              <div className='container-up-1-1-1-detail-service'>
                <div className='letter1'>{garage && garage.name}</div>
              </div>
            </div>
            <div className='letter' style={{ fontWeight: 'bold' }}>
              Minprice
              <div className='container-up-1-1-1-detail-service'>
                <div className='letter1'>{garage && garage.minPrice}</div>
              </div>
            </div>
            <div className='letter' style={{ fontWeight: 'bold' }} >
              Maxprice
              <div className='container-up-1-1-1-detail-service'>
                <div className='letter1'>{garage && garage.maxPrice}</div>
              </div>
            </div>

          </div>
        </div>
        <div className='container-up-2-detail-service'>
          <div className='Letter' style={{ marginTop: 30, fontWeight: 'bold' }}>Description
            <div className='container-up-2-1-detail-service'>
              <div className='letter1'>{garage && garage.description}</div>
            </div>
          </div>
        </div>

      </div>
      <div className='container-down-detail-service'>
        <div className='line-detail-service'></div>
        <div className={styles['btn-container']}>
          <Link to={`/update/${id}`}>
            <button type="submit" className={styles['btn-save']}>
              Update
            </button>
          </Link>
          <Link to='/GarageService'>
            <button type="button" className={styles['btn-cancel']}>
              Cancel
            </button>
          </Link>

        </div>

      </div>

    </div>
  </>

  );
}

export default Index;