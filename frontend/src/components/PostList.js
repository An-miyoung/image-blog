import React, {useEffect, useState} from "react";
import Axios from "axios";
import Post from "./Post";
import { useAppContext } from "store";


const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
    // jwtToken 을 가져오기 위해 
    const { store: { jwttoken } } = useAppContext();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then(response => {
                const { data } = response;
                // console.log("loaded response: ", response);
                setPostList(data);
            })
            .catch(error => {
                
            })
    }, []);

    return (
        <div>
            {postList.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    );
}

export default PostList;