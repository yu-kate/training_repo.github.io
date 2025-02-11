//import App from './App';
import React from "react";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LikesCounter from './LikesCounter';

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
        <LikesCounter index={index}/>
    </div>
    </div>;
}

export default PostList;