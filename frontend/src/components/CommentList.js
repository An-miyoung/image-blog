import React, { useState } from "react";
import { axiosInstance, useAxios } from "api";
import { Button, Input, Form } from "antd";
import { useAppContext } from "store";
import Comment from "./Comment";

export default function CommentList({post}) {
    const { store: { jwtToken }} = useAppContext();

    const [commentContent, setCommentContent] = useState("");

    const headers = { Authorization: `JWT ${jwtToken}`};

    const [ { data: commentList, loading, error }, refetch ] = useAxios({
        url: `/api/posts/${post.id}/comments/`,
        headers,
    });

    const handleCommentSave = async () => {
        const apiUrl = `/api/posts/${post.id}/comments/`;
        try {
            const response = await axiosInstance.post(apiUrl, { message: commentContent }, { headers });
            setCommentContent("");
            refetch();
        }
        catch(error){
            console.error(error);
        }
    };

    const onFinish = () => {

    };


    return (
        <div>
            {commentList && commentList.map(comment => (
                <Comment key={comment.id} comment={comment} />))
            }
            <Form name="customized_form_controls"
                  layout="inline"
                  onFinish={onFinish}
            >
                <Form.Item style={{width: "80%"}}>
                    <Input.TextArea 
                        style={{marginBottom: "0.5em"}}
                        value={commentContent}
                        onChange={e => setCommentContent(e.target.value)}
                    />
                </Form.Item>
                <Form.Item> 
                    <Button 
                    type={"primary"} 
                    disabled={commentContent.length === 0}
                    onClick={handleCommentSave}
                    >
                        댓글쓰기
                    </Button>
                </Form.Item>
                
            </Form>
                {/* <Input.TextArea 
                    style={{marginBottom: "0.5em"}}
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                />
                <Button 
                block type={"primary"} 
                disabled={commentContent.length === 0}
                onClick={handleCommentSave}
                >
                    댓글쓰기
                </Button> */}
            


            
        </div>   
    );

}