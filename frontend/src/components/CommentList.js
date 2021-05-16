import React, { useState } from "react";
import Axios from "axios";
import { Button, Input } from "antd";
import useAxios from "axios-hooks";
import { useAppContext } from "store";
import Comment from "./Comment";

export default function CommentList({post}) {
    const { store: { jwtToken }} = useAppContext();

    const [commentContent, setCommentContent] = useState("");

    const headers = { Authorization: `JWT ${jwtToken}`};

    const [ { data: commentList, loading, error }, refetch ] = useAxios({
        url: `http://localhost:8000/api/posts/${post.id}/comments/`,
        headers,
    });

    const handleCommentSave = async () => {
        const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`;
        console.group("handleCommentSave");
        try {
            const response = await Axios.post(apiUrl, { message: commentContent }, { headers });
            setCommentContent("");
            refetch();
        }
        catch(error){
            console.error(error);
        }
    };


    return (
        <div>
            {commentList && commentList.map(comment => (
                <Comment key={comment.id} comment={comment} />))
            }

            <Input.TextArea 
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
            </Button>
        </div>   
    );

}