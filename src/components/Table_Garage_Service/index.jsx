import { Space, Table, Modal } from 'antd';
import eye from '../Table/assets/Icon/eye.png';
import edit from '../Table/assets/Icon/Edit.png';
import deleteIcon from '../Table/assets/Icon/Vector.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/services/http-client.js';

import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);

  const handleDelete = async id => {
    setDeletingItemId(id);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    await axiosInstance.delete(`garage-services/${deletingItemId}`);
    setDeletingItemId(null);
    setConfirmModalVisible(false);
    callApi();
  };

  const handleCancelDelete = () => {
    setDeletingItemId(null);
    setConfirmModalVisible(false);
  };

  const callApi = async () => {
    let params = {
      'pagination[page]': currentPage,
      'pagination[pageSize]': pageSize,
    };
    params['filters[name][$contains]'] = search;
    const responseData = await axiosInstance.get('garage-services', {
      params: params,
    });

    console.log(responseData);

    const users = responseData.data.map(service => ({
      id: service.id,
      name: service.attributes.name,
      description: service.attributes.description,
      maxPrice: service.attributes.maxPrice,
      minPrice: service.attributes.minPrice,

      action: (
        <Space key={service.id} size="middle">
          <Link to={`/GarageService/details/${service.id}`}>
            <img src={eye} style={{ width: '14.05px', height: '16.03px' }} />
          </Link>
          <Link to={`/GarageService/update/${service.id}`}>
            <img src={edit} />
          </Link>
          <button
            style={{ border: 'none', backgroundColor: '#fff' }}
            className="btn_xoa"
            onClick={() => handleDelete(service.id)}
          >
            <img src={deleteIcon} />
          </button>
        </Space>
      ),
    }));

    setData([...users]);
    setTotalItems(responseData.meta.pagination.total);
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      console.log(`Searching for "${search}"...`);
      // Call your search function here
      callApi();
    }, 2000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(debounceTimer);
  }, [search, pageSize, currentPage]);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Min price',
      dataIndex: 'minPrice',
      key: 'minPrice',
    },
    {
      title: 'Max price',
      dataIndex: 'maxPrice',
      key: 'maxPrice',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
    },
  ];

  return (
    <div className="div">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 20 }}>
          All Garage Service
        </h1>
        <Button
          style={{
            backgroundColor: '#8767E1',
            width: '120px',
            color: '#fff',
            height: '42px',
            margin: '0 20px',
          }}
          className="custom-button"
        >
          <Link to="/GarageService/Create">Add Service</Link>
        </Button>
      </div>
      <Space
        direction="vertical"
        size="middle"
        className="UI_search"
        style={{ paddingBottom: '70px', height: '48px' }}
      >
        <span>
          <Space.Compact style={{ width: '300px' }} size="large">
            <Input
              placeholder="Search"
              suffix={<SearchOutlined />}
              style={{ width: '100%' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="large"
            />
          </Space.Compact>
        </span>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
          },
        }}
      />
      <Modal
        visible={confirmModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Confirm"
        cancelText="Cancel"
        centered
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </div>
  );
}
export default App;
