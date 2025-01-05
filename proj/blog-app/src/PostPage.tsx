//import App from './App.js';
import React from "react";
import { useParams } from "react-router-dom";

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
    const thumbnail = content[3];
    const body = content[4];

    return (
        <div>
            title: {title}
        </div>
    )
}

