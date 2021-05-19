import React, { useEffect, useState } from "react";
import { axiosInstance, useAxios } from "api";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
import { useHistory } from "react-router";


function PostList() {
    // jwtToken 을 가져오기 위해 
    const { store: { jwtToken } } = useAppContext();

    const [postList, setPostList] = useState([]);
    const headers = { Authorization: `JWT ${jwtToken}` };
    
    const [{ data: originPostList, loading, error }, refetch] = useAxios({
        url: "/api/posts/",
        headers
    });
    // postList 를 조회하기 위해서는 useAxios 를 이용한다.
    // const [postList, setPostList] = useState([]);
    // useEffect(() => {
    //     const headers = { Authorization: `JWT ${jwtToken}` };
        
    //     Axios.get(apiUrl, { headers })
    //         .then(response => {
    //             const { data } = response;
    //             // console.log("loaded response: ", response);
    //             setPostList(data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }, []);

    useEffect(() => {
        setPostList(originPostList);
    },[originPostList]);
    
    const handleLike = async ({ post, isLike }) => {
        const apiUrl = `/api/posts/${post.id}/like/`;
        const method = isLike ? "POST" : "DELETE";

        try{
            const response = await axiosInstance({
                url: apiUrl, 
                method,
                headers,
            });
            setPostList(prevList => {
                return prevList.map(currentPost => 
                    currentPost === post ? { ...currentPost, is_like: isLike} : currentPost
                );
            });
        }
        catch(error){
            console.error("error: ",error);
        };
    };
    

    return (
        <div>
            {postList && postList.length === 0 && (
                <Alert type="warning" message="보여줄 포스트가 없습니다 :-("/>
            )}
            {postList && postList.map(post => (
                <Post post={post} key={post.id} handleLike={handleLike}/>
            ))}
        </div>
    );
}

export default PostList;