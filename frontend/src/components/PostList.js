import React, {useEffect, useState} from "react";
import Axios from "axios";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";


const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
    // jwtToken 을 가져오기 위해 
    const { store: { jwtToken } } = useAppContext();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const headers = { Authorization: `JWT ${jwtToken}` };
        
        Axios.get(apiUrl, { headers })
            .then(response => {
                const { data } = response;
                // console.log("loaded response: ", response);
                setPostList(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);
    
    return (
        <div>
            {postList.length === 0 &&
                <Alert type="warning" message="보여줄 포스트가 없습니다 :-("/>
            }
            {postList.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    );
}

export default PostList;