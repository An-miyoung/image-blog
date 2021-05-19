import React, { useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import Suggestion from "./Suggestion";
import { axiosInstance, useAxios } from "api";
import { useAppContext } from "store";
import "./SuggestionList.scss";

export default function SuggestionList({ style }) {
    const { store: { jwtToken }} = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}`};
    const [userList, setUserList] = useState([]);

    // suggestionList 을 가져오기 위한 조회용으로 useAxios 사용하면 유용
    const [ { data: originUserList, loading, error }, refetch ] = useAxios({
        url: "/accounts/suggestions/",
        headers,
    });

    // 매 render 시 originUserList 를 도는 비효율을 없애기 위해
    // useEffect 는 originUserList 의 값이 바뀔때만 수행
    useEffect(() => {
        if ( !originUserList ) 
            setUserList([]);
        else 
            setUserList(originUserList.map(user => ({ ...user, is_follow: false })));
    }, [originUserList]);

    const onFollowUser = username => {
        axiosInstance.post("/accounts/follow/", { username }, { headers })
            .then(response => {
                setUserList(prevUserList => 
                    prevUserList.map(user => 
                        (user.username !== username) ? user : {...user, is_follow: true}
                    ) 
                )
            })
            .catch(error => {
                console.error(error)
            }); 
        console.log("username:", username);
    };
    
    // useAxios 가 useState, useEffect, Axios 가 하는 일을 다 한다.
    // const [ userList, setUserList ] = useState([]);
    // useEffect(() => {
    //     async function fetchUserList() {
    //         const apiUrl = "http://localhost:8000/accounts/suggestions/";
    //         const headers = { Authorization: `JWT ${jwtToken}`};
    //         try {
    //             const { data } = await Axios.get(apiUrl, { headers });
    //             setUserList(data);
    //         }
    //         catch(error) {
    //             console.error(error);
    //         }     
    //     }
    //     fetchUserList();
    // },[]);
    
    return (
        <div style={style}>
            {loading && <div>Loading....</div>}
            {error && <div>로딩 중에 에러가 발생했습니다.</div>}

            {/* 굳이 이 상황에서는 필요치 않지만
            <button onClick={() => refetch()}>Refresh</button> */}
            <Card title="Suggestions for you" size="small">
                { userList &&
                  userList.map(suggestionUser => (
                    <Suggestion 
                        key={suggestionUser.username} 
                        suggestionUser={suggestionUser} 
                        onFollowUser={onFollowUser}
                    />)
                )}
            </Card>
        </div>
    );
}