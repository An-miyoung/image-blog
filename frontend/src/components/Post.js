import React from "react";
import Axios from "axios";
import { Avatar, Card } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons"
import CommentList from "./CommentList";

function Post({ post, handleLike }) {    
    const { author, caption, location, photo, tag_set, is_like } = post;
    const { username, name, avatar_url } = author;
   
    return (
        <div className="post" style={{marginBottom:'2rem'}}>
            <Card 
                hoverable 
                cover={<img src={photo} alt={caption}/>}
                actions={[
                    is_like ? (
                        <HeartTwoTone 
                            twoToneColor="red" 
                            onClick={() => handleLike({post, isLike: false})}
                        />
                    ) : (
                        <HeartOutlined 
                            onClick={() => handleLike({post, isLike: true})}
                        />
                    )
                ]}
            >
                <Card.Meta 
                    avatar=
                        {<Avatar size="large" 
                                icon={<img src={ avatar_url } alt={ username }/>} />} 
                    title={location} 
                    description={caption}
                    style={{marginBottom: "0.5em"}}
                />
                <CommentList post={post} />
            </Card>
        </div>
    );
}

export default Post;
