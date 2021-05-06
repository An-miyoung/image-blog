import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "./Suggestion.scss";

export default function Suggestion({ suggestionUser }) {
    const { username, name, avatar_url } = suggestionUser;
    
    return (
        <div className="suggestion">
            <div className="avatar">
                <Avatar icon={ 
                    <img src={"http://localhost:8000"+avatar_url} 
                         alt={`${username}'s avatar`}/> } 
                />        
            </div>
            <div className="username">
                {/* username 만 노출하는 것이 소셜의 기본모습아닌가? */}
                { name.length === 0 ? username : name }
            </div>
            <div className="action">
                <Button size="small">Follow</Button>
            </div>
        </div>
    )
}