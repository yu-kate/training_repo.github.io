import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";

import Input from './components/Input';
import PostList from './components/PostList';
import PostPage from './components/PostPage';
import AboutContact from './components/AboutContact';

export default function Blog() {
  const [blogContent, setBlogContent] = useState(() => {
    const savedContent = getSavedContent();
    return savedContent;
  });
  function setSavedContent() {
    localStorage.setItem("savedContent", JSON.stringify(blogContent));
  }
  function getSavedContent() {
    const savedContent = JSON.parse(localStorage.getItem("savedContent") || "");
    if (savedContent==null) {return null;}
    return savedContent;
  }
  // const ResetSavedContent = () => {
  //   function reset() {
  //     setBlogContent([""]);
  //     setSavedContent();
  //   }
  //   return <button onClick={reset}>reset</button>;
  // }

  interface handlePostProps {
    input: Array<string>;
  }
  const handlePost = (input: handlePostProps) => {
    console.log("hp input", input);

    setBlogContent(()=>{
      let updatedBlogContent = [...blogContent];
      updatedBlogContent.unshift(input);
      //console.log("unshift", updatedBlogContent);
      return updatedBlogContent;
    });
  }

  useEffect(() => {
    setSavedContent();
  }, [blogContent]);

  useEffect(() => {
    if (getSavedContent().length <= 2) {
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
    }
  }, [])
  
  return ( <>
    <Routes>
      <Route path='/'
        element={
          <>
          {/* <ResetSavedContent /> */}
          <div id="main-container">
            <PostList blogContent={blogContent} />
            <Input
              handlePost={handlePost}
            />
          </div>
          <AboutContact />
          </>
        }/>
      <Route path='/posts/:index'
        element={<PostPage allPageContent={blogContent}/>} />
    </Routes>
    </>
  );
}
