import App from './App';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function PostList({ blogContent }) {
    // {console.log("blogContent", blogContent)}
    if (!blogContent) return;
    return (
      <div class="posts-container">
        <h2 class="header">recent posts</h2>
        <ul>
          {blogContent.map((content, index) => {
            return <li key={index}><Post content={content} index={index}/></li>
          })}
        </ul>
      </div>
    );
  }
  
function Post({ content, index }) {
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

  return <div class="post-item">
    <div class="post-item-container">
        <img class="thumbnail" src={thumbnail} alt={title}/>
        <div class="post-title"><Link to={generateLink()}>{title}</Link></div>
        <div class="post-preview">{preview}</div>
        <div class="subtext post-date">{date}</div>
        <div class="post-author">{author}</div>
        <LikesComponent index={index}/>
    </div>
    </div>;
}

function LikesComponent({index}) {
const [likesCounter, setLikesCounter] = useState(() => {
    const savedLikes = getSavedLikes();
    return savedLikes;
});
function setSavedLikes() {
    localStorage.setItem(String("savedLikes"+index), JSON.stringify(likesCounter));
}
function getSavedLikes() {
    const savedLikes = JSON.parse(localStorage.getItem(String("savedLikes"+index)));
    if (savedLikes==null) return 0;
    return savedLikes;
}
useEffect(() => {
    setSavedLikes();
}, [likesCounter]);

return <div class="likes-counter">
    <button onClick={() => setLikesCounter(likesCounter+1)}>
    <img src="images/upvote-button.png" alt="upvote" class="like-button"/>
    </button>
    <span class="num-likes">{likesCounter>0 ? "+" : ''}{likesCounter}</span>
    <button onClick={() => setLikesCounter(likesCounter-1)}>
    <img src="images/downvote-button.png" alt="downvote" class="like-button"/>
    </button>
</div>
}

export default PostList;