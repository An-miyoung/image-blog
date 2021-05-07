import React from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks";
import { useAppContext } from "store";

export default function SuggestionList({ style }) {
    const { store: { jwtToken }} = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}`};

    const config  = "http://localhost:8000/accounts/suggestions/"
    const [ { data: userList, loading, error }, refetch ] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers,
    });
    
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
                    <Suggestion key={suggestionUser.username} suggestionUser={suggestionUser} />)
                )}
            </Card>
        </div>
    );
}