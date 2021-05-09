import React from "react";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
import useAxios from "axios-hooks";


function PostList() {
    // jwtToken 을 가져오기 위해 
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}` };
    

    const [{ data: postList, loading, error }, refetch] = useAxios({
        url: "http://localhost:8000/api/posts/",
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
    
    return (
        <div>
            {postList && postList.length === 0 && (
                <Alert type="warning" message="보여줄 포스트가 없습니다 :-("/>
            )}
            {postList && postList.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    );
}

export default PostList;