## Simple reddit with hamster theme

This is a simplified reddit using [this reddit API](https://github.com/reddit-archive/reddit/wiki/JSON).

### Project Features

- Users see an initial view of the r/hamster when first visiting the app
- Users can search the data using keywords
- Users can filter the data based on posts, communities and people
- Users can see comments and replies when when clicking comment icon

#### Wireframe
![Simple Reddit](https://github.com/peiyi-c/simple-reddit/assets/73789013/87a2c2af-6f15-4945-a8e5-2e18a7873813)

#### Screenshot
![Simple Reddit Screenshot](https://github.com/peiyi-c/simple-reddit/assets/73789013/5d456a57-92ef-4d24-9063-51133b09ad5b)

#### Live Link

- [Live Link](https://nasty-riddle.surge.sh/)
  

### Technologies used

- SCSS
- React
- React Router
- Redux
- Redux Toolkit

### File structure

```

├── dist
├── public
├── src
│   ├── api
│   │    └── reddit.js
│   ├── assets
│   │    └── ...
│   ├──components
│   │     ├── Header
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── HomePage
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── Search
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── NotFound
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── Main
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── Aside
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── Navigation
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── Card
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── CardLoading
│   │     │   └── index.jsx
│   │     │
│   │     ├── Community
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── CommunityLoading
│   │     │   └── index.jsx
│   │     │
│   │     ├── User
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── UserLoading
│   │     │   └── index.jsx
│   │     │
│   │     ├── Comment
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── CommentLoading
│   │     │   └── index.jsx
│   │     │
│   │     ├── Subreddit
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     ├── SubredditLoading
│   │     │   └── index.jsx
│   │     │
│   │     ├── Reply
│   │     │   ├── index.jsx
│   │     │   └── index.scss
│   │     │
│   │     └── DummyImage
│   │         ├── index.jsx
│   │         └── index.scss
│   │
│   ├── containers
│   │     └── themeContext.jsx
│   │
│   ├── features
│   │     ├── visibilitySlice.js
│   │     ├── themeSlice.js
│   │     ├── subredditSlice.js
│   │     ├── searchTermySlice.js
│   │     └── hamsterRedditsSlice.js
│   │
│   ├── store
│   │     └── index.jsx
│   │
│   ├── utilities
│   │     └── helpers.js
│   │
│   ├── App.jsx
│   ├── App.scss
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
...
└── README.md

```

### Future work

- Limite to 10 queries per minute. (free Reddit APIs limitation)
- Write unit tests for components using Jest and Enzyme
- Write end-to-end tests
