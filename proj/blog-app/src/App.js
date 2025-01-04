import './App.css';
import { useState, useEffect, use } from "react";

// function PersistentStateComponent() {
//   // Get the initial state from localStorage or default to an empty string
//   const [name, setName] = useState(() => {
//     const savedName = localStorage.getItem('name');
//     return savedName ? savedName : ''; // If no name is saved, default to an empty string
//   });

//   // Effect hook to store the state in localStorage whenever it changes
//   useEffect(() => {
//     if (name) {
//       localStorage.setItem('name', name); // Save state to localStorage
//     }
//   }, [name]); // Runs every time `name` changes

//   return (
//     <div>
//       <h1>Persistent State with LocalStorage</h1>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)} // Update state when input changes
//       />
//       <p>Your name: {name}</p>
//     </div>
//   );
// }

export default function Blog() {
  
  const [blogContent, setBlogContent] = useState(() => {
    const savedContent = getSavedContent();
    // console.log("savedContent", savedContent);
    return savedContent;
  });
  function setSavedContent() {
    // console.log("setSavedContent entered");
    // console.log("what is being saved: ", blogContent);
    localStorage.setItem("savedContent", JSON.stringify(blogContent));
    // console.log("updated SavedContent", getSavedContent());
  }
  function getSavedContent() {
    // console.log("getSavedContent entered");
    const savedContent = JSON.parse(localStorage.getItem("savedContent"));
    // console.log("retrieved savedContent", savedContent);
    if (savedContent==null) {return null;}
    return savedContent;
  }
  const ResetSavedContent = () => {
    function reset() {
      setBlogContent([""]);
      setSavedContent();
    }
    return <button onClick={reset}>reset</button>;
  }

  const handlePost = (input) => {
    // console.log("handlePost reached");
    console.log("hp input", input);

    setBlogContent(()=>{
      let updatedBlogContent = [...blogContent];
      updatedBlogContent.unshift(input);
      //console.log("unshift", updatedBlogContent);
      return updatedBlogContent;
    });
  }
  useEffect(() => {
    // console.log("useEffect entered");
    setSavedContent();
  }, [blogContent]);

  return (
    <>
      <ResetSavedContent />
      <PostList blogContent={blogContent} />
      <Input
        handlePost={handlePost}
      />
    </>
  );
}

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
        return <button onClick={handleClick} type="button">Post</button>;
    }

  return (
    <>
        <h2 class="header">Submit a Post!</h2>
        <form class="input-container">
            <div>
            <label><p class="input-header">Date:</p></label><br/>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} //onChange={(t) => onContentChange(t.target.value)}
            />
            </div>
            <div>
            <label><p class="input-header">Title:</p></label><br/>
            <input
                type="txt"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <div>
            <label><p class="input-header">Author:</p></label><br/>
            <input
                type="txt"
                value={author}
                onChange={(e) => setAuthor(e.target.value)} 
            />
            </div>
            <div>
                <label><p class="input-header">Thumbnail(URL):</p></label><br/>
                <input
                    type="txt"
                    value={thumbnail}
                    onChange={(e)=>setThumbnail(e.target.value)}
                />
            </div>
            <div>
            <label><p class="input-header">Body:</p></label><br/>
            <input
                type="txt"
                value={body}
                onChange={(e) => setBody(e.target.value)} 
            />
            </div>
            <div>
            {/* <button type="button" onClick={OnPost}>Post</button> */}
            <PostButton />
            </div>
        </form>
    </>
  );
}

function PostList({ blogContent }) {
  // {console.log("blogContent", blogContent)}
  if (!blogContent) return;
  return (
    <div class="posts-container">
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

  return <div class="post-item">
    <div class="post-item-container">
        {/* src placeholder */}
        <img class="thumbnail" src='https://cdn4.vectorstock.com/i/1000x1000/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg' alt={title}/>
        <div class="post-subject">{title}</div>
        <div class="subtext details">
            <p>{date}</p>
            <p>{author}</p>
        </div>
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

  return <div>
    <button onClick={() => setLikesCounter(likesCounter+1)}>Upvote</button>
    <span>{likesCounter>0 ? "+" : ''}{likesCounter}</span>
    <button onClick={() => setLikesCounter(likesCounter-1)}>Downvote</button>
  </div>
}

