import React, { useState } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router";
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useAppContext, setToken } from "store";
import LogoImage from "assets/logo2.png";
import { parseErrorMessages } from "utils/forms";


export default function Login() {
    const history = useHistory();

    // useAppContext 를 사용해서 jwtToken 을 처리하기 위해 아래 로직은 생략
    // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const { dispatch } = useAppContext();
    const location = useLocation();
    const [fieldErrors, setFieldErrors] = useState({});

    const { from: loginRedirectUrl } = location.state || { from : { pathname: "/" }};

    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await Axios.post("http://localhost:8000/accounts/token/", data);

                // const jwtToken = response.data.token 과 같은 의미를 아래처럼 쓴다.
                const { data: { token: jwtToken } } = response;
                
                // useAppContext 를 사용해서 jwtToken 을 처리하기 위해 아래 로직은 생략
                // setJwtToken(jwtToken);
                dispatch(setToken(jwtToken));

                notification.open({
                    message: "로그인했습니다.",
                    icon: <SmileOutlined style={{color: "#108ee9"}}/>        
                });
                history.push(loginRedirectUrl);
            }
            catch(error) {
                if ( error.response ) {
                    notification.open({
                        message: "로그인에 실패했습니다.",
                        description: "사용자이름과 비밀번호를 확인해주세요",
                        icon: <FrownOutlined style={{color:"#ff3330"}}/>        
                    });
                    const { data: fieldsErrorMessages } = error.response;
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                    
                }
            }
        }
        fn();
    };

    return ( 
        <>
            <div style={{marginTop: '20px', marginLeft: '20px'}}>
                <h1 className="page-logo">
                    <img src={LogoImage} alt="logo" style={{marginRight:'0.5em'}} />
                    Pop-up Book
                </h1>
            </div>
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
        </> 
    );
}

// antd 에서는 한 row당 24column으로 본다
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};