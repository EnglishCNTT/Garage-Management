import React, { useContext } from "react";
import './style.css'
import swal from 'sweetalert';
import { useEffect } from "react";
// import { AuthContext } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import Slide_bar from "../../components/Slider_bar/index";
import axiosInstance from '../../shared/services/http-client.js';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
} from 'antd';
import axios from "axios";

function Change_pw_page() {
    // const auth = useContext(AuthContext);
    // const nav = useNavigate()
    const API = "http://localhost:1337/api/auth/change-password";

    const handleSubmit = (e) => {
        const data = {
            currentPassword: e.CurrentPassword,
            password: e.NewPassword,
            passwordConfirmation: e.ConfirmPassword,
        }
        try {
            axiosInstance.post("auth/change-password", data).then((res) => {
                swal({
                    title: 'Good job!',
                    text: 'Changepassword is successful!',
                    icon: 'success',
                    button: 'OK',
                    position: 'top-end',
                    width: 400,
                    padding: '2em',
                    backdrop: true,
                    timer: 1000,
                })
            })
        } catch (error) {
            console.log(error)
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 12,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
    };

    const labelStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 300,
    };

    return (
        <Slide_bar>
            <div className="Change_pw_page">
                <div className="Change_pw_page_box">
                    <p style={{ color: 'gray' }}>Now you can create a new Password for your account</p>
                    <Form onFinish={handleSubmit} {...formItemLayout} layout="vertical">
                        <Form.Item
                            name="CurrentPassword"
                            label="Current Password"
                            style={{ marginBottom: '30px', height: '56px' }}
                            labelCol={{ style: labelStyle }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password size="large" placeholder="Enter current password" />
                        </Form.Item>
                        <Form.Item
                            name="NewPassword"
                            label="New Password"
                            style={{ marginBottom: '30px', height: '56px' }}
                            labelCol={{ style: labelStyle }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password size="large" placeholder="Enter New Password" />
                        </Form.Item>
                        <Form.Item
                            name="ConfirmPassword"
                            label="Confirm Password"
                            style={{ marginBottom: '30px', height: '56px', }}
                            labelCol={{ style: labelStyle }}
                            dependencies={['password']}
                            hasFeedback


                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },

                            ]}
                        >
                            <Input.Password size="large" placeholder="Enter confirm Password" />
                        </Form.Item>
                        <br />
                        <Form.Item>
                            <Button className="CPW_save" type="primary" htmlType="submit" style={{ width: '109px', height: '48px', padding: '12px, 16px, 12px, 16px' }}>Save</Button>
                            <Link to="/view_profile"><Button className="CPW_cancel" style={{ width: '109px', height: '48px', border: "2px solid #8767E1", paddingLeft: "12px, 16px, 12px, 16px", marginLeft: '21px' }}>Cancel</Button></Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Slide_bar>
    );
}

export default Change_pw_page;

