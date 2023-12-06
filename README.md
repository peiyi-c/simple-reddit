## Simple reddit with hamster theme

This is a simplified reddit using [this reddit API](https://github.com/reddit-archive/reddit/wiki/JSON).

### Project Features

- Users see an initial view of the r/hamster when first visiting the app
- Users can search the data using keywords
- Users can filter the data based on posts, communities and people
- Users can see comments and replies when when clicking comment icon

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
