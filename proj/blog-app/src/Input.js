import App from './App.js';
import { useState, useEffect } from "react";

function Input(props) {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [body, setBody] = useState("");
    let input = [date, title, author, thumbnail, body];

    const PostButton = () => {
        const [clicked, setClicked] = useState(false);
        // const [test, setTest] = useState(1);
        const [input, setInput] = useState(["", "", "", "", ""]);
        const handleClick = () => {setClicked(!clicked);};

        useEffect(() => {
            if (clicked) {
                setInput([date, title, author, thumbnail, body]);
            }}, [clicked]); 

        if(clicked) {
            let isValid = true;
            for (var index in input) {
                if (input[index]=='') isValid = false;
            }
            if (isValid) {props.handlePost(input)};
        }
        return <button onClick={handleClick} type="button" id="post-button">Post</button>;
    }

  return (
    <form class="input-container">
      <h2 class="header">submit a post!</h2>
        <div>
        <label><p class="input-header">Date:</p></label><br/> 
        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} //onChange={(t) => onContentChange(t.target.value)}
            class="input-field"
        />
        </div>
        <div>
        <label><p class="input-header">Title:</p></label><br/>
        <textarea
            type="txt"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            class="input-field"
        />
        </div>
        <div>
        <label><p class="input-header">Author:</p></label><br/>
        <textarea
            type="txt"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} 
            class="input-field" id="author-input"
        />
        </div>
        <div>
            <label><p class="input-header">Thumbnail(URL):</p></label><br/>
            <textarea
                type="txt"
                value={thumbnail}
                onChange={(e)=>setThumbnail(e.target.value)}
                class="input-field"
            />
        </div>
        <div>
        <label><p class="input-header">Body:</p></label><br/>
        <textarea
            type="txt"
            value={body}
            onChange={(e) => setBody(e.target.value)} 
            class="input-field" id="body-input"
        />
        </div>
        <div>
        {/* <button type="button" onClick={OnPost}>Post</button> */}
        <PostButton />
        </div>
    </form>
  );
}

export default Input;