import { Button } from "antd";
import AppLayout from "components/AppLayout";
import PostList from "components/PostList";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import React from "react";
import { useHistory } from "react-router";

function Home() {
    const history = useHistory();
    const handleClick = () => {
        history.push("posts/new");
    };
    const sidebar = (
        <>
            <Button 
                type="primary" 
                block style={{ marginBottom: '1rem'}}
                onClick={handleClick}
            >
                새로운 포스트 쓰기
            </Button>
            <StoryList style={{ marginBottom: '1rem'}}/>
            <SuggestionList style={{ marginBottom: '1rem'}}/>
        </>
    );
        
    
    
    return (
        <AppLayout sidebar={sidebar}>
            <PostList />;
        </AppLayout>
    )
}

export default Home;