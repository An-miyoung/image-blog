import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

export default function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});

            const data = { username, password };
            try {
                await Axios.post("http://localhost:8000/accounts/signup/", data);
                
                notification.open({
                    message: "회원가입을 축하합니다.",
                    description: "로그인페이지로 이동합니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>        
                });
                history.push("/accounts/login");
            }
            catch(error) {
                if ( error.response ) {
                    notification.open({
                        message: "회원가입에 실패했습니다.",
                        description: "사용자이름과 비밀번호를 확인해주세요",
                        icon: <FrownOutlined style={{color:"#ff3330"}}/>        
                    });
                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce((
                            acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                                }
                            return acc;
                            }, {}
                        )
                    );
                    
                }
            }
        }
        fn();
    };

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="사용자이름"
                name="username"
                rules={[
                    { required: true, message: '사용자이름을 입력해주세요!' },
                    { min: 4, message: '4글자이상의 영문자를 입력해주세요.'}
                ]}
                hasFeedback
                {...fieldErrors.username}
            >
                <Input />
            </Form.Item>
    
            <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                    { required: true, message: '비밀번호를 입력해주세요!' },
                    { min: 5, message: '5글자이상의 영문자와 숫자 조합을 입력해주세요.'}
                ]}
                hasFeedback
                {...fieldErrors.password}
            >
                <Input.Password />
            </Form.Item>
    
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    회원가입
                </Button>
            </Form.Item>
        </Form>
    );
}

// antd 에서는 한 row당 24column으로 본다
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};