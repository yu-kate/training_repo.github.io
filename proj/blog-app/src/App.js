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

  useEffect(() => {
    console.log("pre savedContent", getSavedContent());
    const post1 = ['2024-12-31', '"Love, Actually": Not a Movie Loved by Me, Actually', 'John Doe',
      'https://www.themoviedb.org/t/p/original/fWgoECxHGq8Xgbjpi9yhCWkEZDl.jpg',
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Inceptos orci semper quam per neque tempor. Dapibus platea vel volutpat elit sociosqu tempus. Euismod habitant eleifend mattis sem sollicitudin. Ligula velit scelerisque laoreet ipsum, felis posuere morbi. Feugiat arcu aliquet felis nullam tincidunt fusce consectetur.\nFringilla enim diam, iaculis aliquet accumsan primis in. Inceptos netus fames diam purus vivamus. Non velit interdum egestas commodo luctus pellentesque dapibus posuere convallis. Amet efficitur phasellus mollis aliquam ligula natoque diam purus amet. Natoque risus vulputate at per placerat erat blandit. Nam eu ut hac tincidunt maecenas amet mauris rutrum.'
    ];
    const post2 = ['2024-12-31', 'The All-Too-Familiar Chaos in "National Lampoon\'s Christmas Vacation"', 'Jane Doe',
      'https://th.bing.com/th/id/R.1a840290e1d6ea5c07fd3a7b53ec4f70?rik=o1E7aN7nAwYoUQ&pid=ImgRaw&r=0',
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Vel mollis habitasse nec netus porttitor ante velit natoque. Mauris id semper class faucibus luctus quisque ligula. Platea nam parturient eros nulla nascetur suspendisse. Ac velit nibh ipsum vulputate mollis semper eget nibh. Mollis senectus netus proin quam; proin consectetur ultricies venenatis. Velit sem litora; sodales mauris penatibus pharetra. Cubilia tortor lectus ridiculus facilisis maximus dignissim sollicitudin.\nHabitasse fames pellentesque maecenas felis aenean metus? Porttitor feugiat magnis neque per sodales. Commodo imperdiet blandit feugiat sociosqu feugiat rutrum consequat malesuada. Class rutrum semper magnis, amet maecenas aliquam. Libero taciti convallis rutrum cubilia cras dignissim nulla. Dapibus lectus bibendum mi nibh mi nec facilisi ac. Quis odio ex maximus odio litora semper netus magna. Massa risus lobortis urna dignissim; finibus arcu ex consectetur!\nCras sapien aptent pulvinar potenti tempor maximus habitasse. Sapien dolor eget ut odio tortor dignissim; sem ultricies suspendisse. Per litora suspendisse nibh vestibulum blandit mollis. Nam sapien ligula facilisis facilisis euismod porttitor congue lorem. Fusce nec mattis purus lacinia eu purus sed. Taciti eros dui nam sollicitudin tincidunt duis, convallis pulvinar pharetra. Lacinia phasellus mauris interdum nullam habitasse leo libero. Sit massa maximus litora nulla dapibus pretium. Primis congue lectus luctus arcu pharetra porta bibendum.'
    ];
    const initBlogContent = [post1, post2];
    setBlogContent(initBlogContent);
  }, [])
  
  return (
    <>
      <ResetSavedContent />
      <div id="main-container">
      <PostList blogContent={blogContent} />
      <Input
        handlePost={handlePost}
      />
      </div>
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

  return <div class="post-item">
    <div class="post-item-container">
        <img class="thumbnail" src={thumbnail} alt={title}/>
        <div class="post-title">{title}</div>
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

