import React, { useEffect, useState } from "react";
import Axios from "axios";
import useLocalStorage from "utils/useLocalStorage";
import { useHistory } from "react-router";
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

export default function Login() {
    const history = useHistory();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({});

    console.log("loaded jwtToken: ", jwtToken);

    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await Axios.post("http://localhost:8000/accounts/token/", data);

                // const jwtToken = response.data.token 과 같은 의미를 아래처럼 쓴다.
                const { data: { token: jwtToken } } = response;
                
                setJwtToken(jwtToken);

                notification.open({
                    message: "로그인했습니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>        
                });
                // history.push("/accounts/login");
            }
            catch(error) {
                if ( error.response ) {
                    notification.open({
                        message: "로그인에 실패했습니다.",
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
        <Card title="로그인">     
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
                    {...fieldErrors.non_field_errors}
                >
                    <Input />
                </Form.Item>
        
                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                        { required: true, message: '비밀번호를 입력해주세요!' },
                    ]}
                    hasFeedback
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>
        
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                </Form.Item>
            </Form>
        </Card>  
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