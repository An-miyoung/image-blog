import React, { useState } from "react";
import Axios from "axios";
import { Form, Input, Button, notification, Modal, Upload } from 'antd';
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile} from "utils/base64";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";
import { useHistory } from "react-router";

export default function PostNewForm() {
    const { store: { jwtToken }} = useAppContext();
    const [fileList, setFileList] = useState([]);
    const history = useHistory();
    // 프리뷰를 보여주기 위한 상태값 저장, base64 로 코딩해서 저장하고 
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null,
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const handleFinish = async fieldValues => {
        
        const { caption, location, photo: { fileList } } = fieldValues;

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);
        fileList.forEach(file => {
            formData.append("photo", file.originFileObj);
        })

        const headers = { Authorization: `JWT ${jwtToken}`};
        try {
            const response = await Axios.post("http://localhost:8000/api/posts/", formData, { headers });
            console.log("response: ", response);
            history.push("/");
        }
        catch(error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages} = error.response;
                if (typeof fieldsErrorMessages === "string") {
                    notification.open({
                        message: "요청오류",
                        description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해 주세요`,
                        icon: <FrownOutlined style={{color:"#ff3330"}}/>              
                })}
                else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            } 
        }
    };

    const handleUploadChange = ({fileList}) => {
        setFileList(fileList);
    };

    const handlePreviewPhoto = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }
        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview,
        });
    };

    return ( 
        <Form
            {...layout}
            onFinish={handleFinish}
            autoComplete={"false"}
        >
            <Form.Item 
                label="사진" 
                name="photo" 
                rules={[
                    { required:true, message: "사진을 입력해주세요" }
                ]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload 
                    listType="picture-card" 
                    fileList={fileList}
                    beforeUpload={() => {
                        return false;
                    }}
                    onChange={handleUploadChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                            
                        </div>
                    )}
                    
                </Upload>
            </Form.Item>

            <Form.Item
                label="글"
                name="caption"
                rules={[
                    { required: true, message: '사진에 대해 얘기해주세요' },
                ]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="위치"
                name="location"
                rules={[
                    { required: true, message: '사진관련 장소를 입력해주세요' },
                ]}
                hasFeedback
                {...fieldErrors.location}
            >
                <Input />
            </Form.Item>
    
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    글 올리기
                </Button>
            </Form.Item>
            <Modal 
                visible={previewPhoto.visible} 
                footer={null}
                onCancel={() => {
                    setPreviewPhoto({
                        visible: false,
                    })
                }}
            >
                <img 
                    src={previewPhoto.base64} 
                    style={{width:'100%'}} 
                    alt="Preview"
                />                        
            </Modal>
            {JSON.stringify(fileList)};
        </Form>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};