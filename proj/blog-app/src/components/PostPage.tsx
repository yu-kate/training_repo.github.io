//import App from './App.js';
import React from "react";
import { useParams } from "react-router-dom";

import LikesCounter from './LikesCounter';

interface PostPageProps {
    //FIND BETTER TYPE 
    allPageContent: any;
}
type PostPageParams = {
    index: string;
}
export default function PostPage({allPageContent}: PostPageProps) {
    let { index } = useParams<PostPageParams>();
    // console.log("allpagecontent", allPageContent);
    const content = allPageContent[Number(index)];

    const date = content[0];
    const title = content[1];
    const author = content[2];
    const picture = content[3];
    const body = content[4];

    return (
        <div className="post-page">
            <div className="subtext post-date">{date}</div>
            <div className="post-title">{title}</div>
            <div className="post-author">{author}</div>
            <div className="post-body">{body}</div>
            <div className="post-side">
                <img className="picture" src={picture} alt={title} />
                {/* <LikesCounter index={Number(index)} /> */}
            </div>
        </div>
    )
}

