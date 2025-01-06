import React from "react";
import { useState, useEffect } from "react";

interface LikesProps {
    index: Number;
  }

export default function LikesCounter({index}: LikesProps) {

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
    
    return (
    <div className="likes-counter">
        <button onClick={() => setLikesCounter(likesCounter+1)}>
        <img src="/src/images/upvote-button" alt="upvote" className="like-button"/>
        </button>
        <span className="num-likes">{likesCounter>0 ? "+" : ''}{likesCounter}</span>
        <button onClick={() => setLikesCounter(likesCounter-1)}>
        <img src="/src/images/downvote-button" alt="downvote" className="like-button"/>
        </button>
    </div>);
}