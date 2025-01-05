//import App from './App';
import React from "react";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


interface PostListProps {
  blogContent: Array<Array<string>>;
}
function PostList({ blogContent }: PostListProps) {
    // {console.log("blogContent", blogContent)}
    if (!blogContent) return;
    return (
      <div className="posts-container">
        <h2 className="header">recent posts</h2>
        <ul>
          {blogContent.map((content, index) => {
            return <li key={index}><Post content={content} index={index}/></li>
          })}
        </ul>
      </div>
    );
  }
  

interface PostProps {
  content: Array<string>;
  index: Number;
}
function Post({ content, index }: PostProps) {
    if (!content) return;
    const date = content[0];
    const title = content[1];
    const author = content[2];
    const thumbnail = content[3];
    const body = content[4];
    const preview = body.slice(0, 200) + "...";

    function generateLink() {
        let x = '/posts/' + index;
        return x;
    }

  return <div className="post-item">
    <div className="post-item-container">
        <img className="thumbnail" src={thumbnail} alt={title}/>
        <div className="post-title"><Link to={generateLink()}>{title}</Link></div>
        <div className="post-preview">{preview}</div>
        <div className="subtext post-date">{date}</div>
        <div className="post-author">{author}</div>
        <LikesComponent index={index}/>
    </div>
    </div>;
}

interface LikesProps {
  index: Number;
}
function LikesComponent({index}: LikesProps) {
const [likesCounter, setLikesCounter] = useState(() => {
    const savedLikes = getSavedLikes();
    return savedLikes;
});
function setSavedLikes() {
    localStorage.setItem(String("savedLikes"+index), JSON.stringify(likesCounter));
}
function getSavedLikes() {
    const savedLikes = JSON.parse(localStorage.getItem(String("savedLikes"+index)) || '0');
    if (savedLikes==null) return 0;
    return savedLikes;
}
useEffect(() => {
    setSavedLikes();
}, [likesCounter]);

return <div className="likes-counter">
    <button onClick={() => setLikesCounter(likesCounter+1)}>
    <img src="images/upvote-button.png" alt="upvote" className="like-button"/>
    </button>
    <span className="num-likes">{likesCounter>0 ? "+" : ''}{likesCounter}</span>
    <button onClick={() => setLikesCounter(likesCounter-1)}>
    <img src="images/downvote-button.png" alt="downvote" className="like-button"/>
    </button>
</div>
}

export default PostList;