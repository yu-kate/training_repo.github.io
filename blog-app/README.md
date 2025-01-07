# A BASIC BLOG

# About

A basic blog web app to showcase the concepts taught by centralized-intern-training repository (https://github.com/uclaacm/centralized-intern-training.git).

# Getting Started

__The site has -not- been deployed yet. Will do as soon as possible.__

## On Local Machine

Clone this repository using this link: https://github.com/yu-kate/intern-training.git
```
git clone https://github.com/yu-kate/intern-training.git
```

Run the app (in development mode):
```
yarn start
```

Now, open http://localhost:3000

# Structure

## Subcomponents
### PostList
A flexbox (to accomodate for different poster sizes adn title lengths) that houses a post's preview. It consists of a thumbnail image, the date on which the post was submitted, the post's title, the first 200 characters of the post's main writing/body, and a likes counter.

### PostPage
The page which each post preview (in PostList) directs the user towards. Based on the post's index (the order of their posting), the page is generated to display all the same content as the preview plus the entirety of the post's writing/body. 

### LikesCounter
Simply two buttons to 'upvote' and 'downvote' a post that displays the net number of votes. To preserve the number of likes a post gets even after refresh, local storage is utilized (see __Input__'s section describing more in-depth [Local Storage Utilization](####Local-Storage-Utilization))

### Input
Each input field corresponds to 

#### Local Storage Utilization

### AboutContact

# Future Improvements:
-[ ] 



