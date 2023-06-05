import { Space, Table, Modal } from 'antd';
import eye from '../Table/assets/Icon/eye.png';
import edit from '../Table/assets/Icon/Edit.png';
import deleteIcon from '../Table/assets/Icon/Vector.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/services/http-client.js';

import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const options = [
  {
    value: 'Name',
    label: 'Name',
  },
  {
    value: 'Email',
    label: 'Email',
  },
];
const options2 = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
];

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [searchBy, setSearchBy] = useState('Name');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);

  const handleDelete = async id => {
    setDeletingItemId(id);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    await axiosInstance.delete(`garages/${deletingItemId}`);
    setDeletingItemId(null);
    setConfirmModalVisible(false);
    callApi();
  };

  const handleCancelDelete = () => {
    setDeletingItemId(null);
    setConfirmModalVisible(false);
  };

  const callApi = async () => {
    const filters = {
      'pagination[page]': currentPage,
      'pagination[pageSize]': pageSize,
      populate: 'owner, services',
    };
    if (searchBy === 'Name') {
      filters['filters[name][$contains]'] = search;
    } else if (searchBy === 'Email') {
      filters['filters[email][$contains]'] = search;
    }
    if (status === 'Inactive') {
      filters['filters[status][$eq]'] = 'inactive';
    } else if (status === 'Active') {
      filters['filters[status][$eq]'] = 'active';
    }

    const responseData = await axiosInstance.get('garages', {
      params: filters,
    });

    console.log(responseData);

    const users = responseData.data.map((garage) => ({
      id: garage.id,
      name: garage.attributes.name,
      email: garage.attributes.email,
      phoneNumber: garage.attributes.phoneNumber,
      ownerName: garage.attributes.owner.data?.attributes?.fullname,
      status: garage.attributes.status,
      action: (
        <Space key={garage.id} size="middle">
          <Link to={`/GarageManage/details/${garage.id}`}>
            <img src={eye} style={{ width: '14.05px', height: '16.03px' }} />
          </Link>
          <Link to={`/GarageManage/update/${garage.id}`}>
            <img src={edit} />
          </Link>
          <button
            style={{ border: 'none', backgroundColor: '#fff' }}
            className="btn_xoa"
            onClick={() => handleDelete(garage.id)}
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
  }, [search, status, pageSize, currentPage]);

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Garage Owner',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 20 }}>All Garages </h1>
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
          <Link to="/GarageManage/create">Add Garages</Link>
        </Button>
      </div>
      <div className="div">
        <Space
          direction="vertical"
          size="middle"
          className="UI_search"
          style={{ paddingBottom: '70px', height: '48px' }}
        >
          <span>
            <Space.Compact style={{ width: '500px' }} size="large">
              <Select
                defaultValue="Name"
                onChange={value => setSearchBy(value)}
                options={options}
                onClick={() => {
                  callApi();
                }}
                style={{ width: '30%' }}
                size="large"
              />
              <Input
                placeholder="Search"
                suffix={<SearchOutlined />}
                style={{ width: '70%' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                size="large"
              />
            </Space.Compact>
            <Select
              defaultValue="All"
              onChange={value => setStatus(value)}
              options={options2}
              style={{ marginLeft: '10px', width: '150px' }}
              size="large"
            />
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
    </>
  );
}

export default App;
