const chalk = require('chalk')
const _ = require('../partial')
const { _go } = require('../_');

const [,,env] = process.argv;

const log= key => {
  const colorCode = `#${Math.round(Math.random()*0xFF**3).toString(16)}`;

  if(env != key.split(' ')[0]) {
    return () => {}
  }

  return value => {
    const wing = Array.from({length: 32}).fill('-').join('');
    const text = `${wing} ${key} ${wing}`
    console.log(chalk.hex(colorCode)(text))
    console.log(value)
    console.log(chalk.hex(colorCode)(Array.from({length: text.length}).fill('-').join('')))
  }
};

const users = [
  { id: 101, name: 'ID' },
  { id: 102, name: 'BJ' },
  { id: 103, name: 'PJ' },
  { id: 104, name: 'HA' },
  { id: 105, name: 'JE' },
  { id: 106, name: 'JI' }
];

const posts = [
  { id: 201, body: '내용1', user_id: 101 },
  { id: 202, body: '내용2', user_id: 102 },
  { id: 203, body: '내용3', user_id: 103 },
  { id: 204, body: '내용4', user_id: 102 },
  { id: 205, body: '내용5', user_id: 101 },
];

const comments = [
  { id: 301, body: '댓글1', user_id: 105, post_id: 201 },
  { id: 302, body: '댓글2', user_id: 104, post_id: 201 },
  { id: 303, body: '댓글3', user_id: 104, post_id: 202 },
  { id: 304, body: '댓글4', user_id: 105, post_id: 203 },
  { id: 305, body: '댓글5', user_id: 106, post_id: 203 },
  { id: 306, body: '댓글6', user_id: 106, post_id: 204 },
  { id: 307, body: '댓글7', user_id: 102, post_id: 205 },
  { id: 308, body: '댓글8', user_id: 103, post_id: 204 },
  { id: 309, body: '댓글9', user_id: 103, post_id: 202 },
  { id: 310, body: '댓글10', user_id: 105, post_id: 201 }
];



// # 1. 특정인이 쓴 post의 모든 comment 거르기()
const userId_10 = _.filter(posts, function(post) {
  return post.user_id == 101;
}); // 특정 사용자가 쓴 포스트들을 거른다.
// console.log(userId_10);

_.go(
  _.filter(posts, function(post) { 
    return post.user_id == 101;
    // 특정 사용자가 쓴 포스트들을 거른다.
  }), 
  function(posts) {
    return _.filter(comments, function(comment) { 
      return _.find(posts, function(post) {
        return post.id === comment.post_id;
        // 걸러진 포스트에 있는 댓글을 거른다.
      })
    })
  },
  log('1 - a')
)

// posts에서는 id만 사용하기 때문에 id를 거른 후 데이터를 사용한다.
_.go(
  _.filter(posts, function(post) { 
    return post.user_id == 101;
    // 특정 사용자가 쓴 포스트들을 거른다.
  }), 
  _.map(function(post) {
    return post.id;
    // 포스트에서 id 값만 추출한다.
  }),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
      // contains 는 첫번째 인자로 들어온 값들 중 두번째 인자의 값을 포함하고 있다면 true 아니라면 false를 반환한다.
      // _.contains([1, 2], 1); // true
      // _.contains([1, 2], 3); // false
    })
  },
  log('1 - b')
)

// map의 특화 함수인 pluck를 이용하면 좀 더 쉽게 값을 추출할수 있다.
_.go(
  _.filter(posts, function(post) { 
    return post.user_id == 101;
    // 특정 사용자가 쓴 포스트들을 거른다.
  }), 
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
      // contains 는 첫번째 인자로 들어온 값들 중 두번째 인자의 값을 포함하고 있다면 true 아니라면 false를 반환한다.
      // _.contains([1, 2], 1); // true
      // _.contains([1, 2], 3); // false
    })
  },
  log('1 - c')
)

// where 라는 함수로 단축 가능하다.
// where 는 내부적으로 filter함수로 구현 돼 있고 객체의 키와 값에 만족하는 값이 있는가를 찾아주는 함수이다.
_.go(
  _.where(posts, { user_id: 101 }),
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
    })
  },
  log('1 - d')
)

// # 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기(수집하기)
_go(
  _.where(posts, { user_id: 101 }),
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
    })
  },
  _.map(function(comment) { // 1 의 코드에서 친구의 이름을 뽑는 부분만 추가.
    return _.find(users, function(user) {
      return user.id === comment.user_id;
    }).name // 중복 된 이름이 나올 수 있다.
  }),
  log('2 - a')
)

_go(
  _.where(posts, { user_id: 101 }),
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
    })
  },
  _.map(function(comment) {
    return _.find(users, function(user) {
      return user.id === comment.user_id;
    }).name
  }),
  _.uniq,
  log('2 - b')
)

// ! 1, 2 에 중복이 생겼다.

function posts_by(attr) {
  return _.where(posts, attr)
}
// 이 함수를 통해 포스트들 중에 특정 값을 뽑는 것이 가능핟.
_.go(
  posts_by({ user_id: 101 }),
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
    })
  },
  log('1 - e')
)

// - 보조 함수가 없어졌다. 해당 하는 부분에 값을 넣지 않고 함수를 넣어도 된단 듯이 된다.
_.go(
  { user_id: 101 },
  posts_by,
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
    })
  },
  log('1 - f')
)

// - 포스트가 들어오면 post의 아이디를 꺼낸 후, 그 아이디로 댓글을 찾는 함수.
// - 잘개 쪼개져 있어서 그냥 꺼내오기만 하면 된다.
const comments_by_posts = _.pipe(
  _.pluck('id'),
  function(post_ids) {
    return _.filter(comments, function(comment) { 
      return _.contains(post_ids, comment.post_id);
    })
  },
)

_go(
  { user_id: 101},
  posts_by,
  comments_by_posts,
  _.map(function(comment) {
    return _.find(users, function(user) {
      return user.id === comment.user_id;
    }).name
  }),
  _.uniq,
  log('2 - c')
)

// # 3. 특정인의 posts에 comments를 단 친구들 카운트 정보
_go(
  { user_id: 101},
  posts_by,
  comments_by_posts,
  _.map(function(comment) {
    return _.find(users, function(user) {
      return user.id === comment.user_id;
    }).name
  }),
  _.count_by, // uniq 대신 count_by
  log('3 - a')
)

// = 위에서 문제를 푼 로직을 다시 함수로 변형

const f1 = _.pipe(posts_by, comments_by_posts);
log('1 - g')(f1({ user_id: 101 }));

// - 2번 함수에 코멘트를 통해 유저의 이름을 꺼내는 함수를 따로 뺀다.
// 커링을 통해서 함수가 구현돼 있기 때문에 함수로 만들지 않고 아래와 같이 함수를 리턴하는 함수를 만든다.
var comments_to_user_names = _.map(function(comment) {
  return _.find(users, function(user) {
    return user.id == comment.user_id;
  }).name;
});

const f2 = _.pipe(
  f1,
  comments_to_user_names,
  _.uniq
)
log('2 - d')(f2({ user_id: 101 }));

const f3 = _.pipe(
  f1,
  comments_to_user_names,
  _.count_by
)
log('3 - b')(f3({ user_id: 101 }));

// # 4 특정인이 comment를 단 posts 거르기
// 코멘트를 먼저 user_id를 통해 거른 후 포스트를 거르면 된다.
_.go(
  _.where(comments, { user_id: 105 }),
  _.pluck('post_id'),
  _.uniq,
  function(post_ids) {
    return _.filter(posts, function(post) {
      return _.contains(post_ids, post.id);
    });
  },
  log('4 - a')
);

// ! 위 코드에서는 어떤 작업을 할때마다 모든 데이터를 순회한다.
// # 5 users + posts + comments (index_by와 group_by로 효율 높이기)

// const comments_with_users = _.map(comments, function(comment) {
//   return _.extend({
//     user: _.find(users, function(user) {
//       return user.id == comment.user_id;
//     })
//   },  comment);
// })
// console.log(comments_with_users);
// - 이 코드는 코맨트에 유저를 붙일 때 유저를 계속 돌게 된다.

// function find_user_by_id(user_id) {
//   return _.find(users, function(user) {
//     return user.id == user_id;
//   });
// }
// const comments_with_users = _.map(comments, function(comment) {
//   return _.extend({
//     user: find_user_by_id(comment.user_id)
//   },  comment);
// })
// console.log(comments_with_users);
// - 함수로 빼기만 했다.

// - index_by 함수를 이용한다.
// 어떤 키 값을 기준으로 인덱싱을 할지 정하고 데이터를 변경해준다.
const user_by_id = _.index_by(users, 'id');
function find_user_by_id(user_id) {
  return user_by_id[user_id];
}

const comments_with_users = _.map(
  comments,
  function(comment) {
    return _.extend({
      user: find_user_by_id(comment.user_id)
    }, comment);
  }
)
console.log(comments_with_users)

const posts_with_users = _.map(posts, function(post) {
  return _.extend({
    user: find_user_by_id(post.user_id)
  }, post)
});
console.log(posts_with_users)

// const posts_with_comments_user = _.map(
//   posts,
//   function(post) {
//     return _.extend({
//       comments: _.filter(comments_with_users, function(comment) {
//         return comment.post_id == post.id;
//       }),
//       user: find_user_by_id(post.user_id),
//     }, post)
//   }
// )
// console.log(posts_with_comments_user)
// - 여기서도 포스트의 크기 x 코맨트의 크기 만큼의 반복이 일어나는데 인덱싱을 미리 하면 좀 더 효율적으로 코드를 구현할 수 있다.

// - 하나의 포스트에 유저는 한명이지만, 코맨트는 여러개일수 있다.
// index_by 대신 group_by를 사용한다.
const comments_with_users_by_posts = _go(
  comments,
  _.map(function(comment) {
      return _.extend({
        user: find_user_by_id(comment.user_id)
      }, comment);
    }
  ),
  _.group_by('post_id')
)
console.log(comments_with_users_by_posts);

const posts_with_comments_user = _.map(
  posts,
  function(post) {
    return _.extend({
      comments: comments_with_users_by_posts[post.id],
      user: find_user_by_id(post.user_id),
    }, post)
  }
)
console.log(posts_with_comments_user)

// const users_with_posts = _.map(user_by_id, function(user) {
//   return _.extend({
//     posts: _.filter(posts_with_comments_user, function(post) {
//       return post.user_id == user.id;
//     })
//   }, user)
// })

console.log(users_with_posts)

var posts_with_comments_user_by_id = _.group_by(posts_with_comments_user, 'user_id');
console.log(posts_with_comments_user_by_id);

var users_with_posts = _.map(user_by_id, function(user) {
  return _.extend({
    posts: posts_with_comments_user_by_id[user.id] || []
  }, user);
});
console.log(users_with_posts)

// 5.1. 특정인의 posts의 모든 comments 거르기
var user = users_with_posts[0];

_.go(user.posts,
  _.pluck('comments'),
  _.flatten,
  console.log);

console.log(_.deep_pluck(user, 'posts.comments'));

// 5.2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
_.go(user.posts,
  _.pluck('comments'),
  _.flatten,
  _.pluck('user'),
  _.pluck('name'),
  _.uniq,
  console.log);

_.go(user, _.deep_pluck('posts.comments.user.name'), _.uniq, console.log);

// 5.3. 특정인의 posts에 comments를 단 친구들 카운트 정보

_.go(user.posts,
  _.pluck('comments'),
  _.flatten,
  _.pluck('user'),
  _.pluck('name'),
  _.count_by,
  console.log);

_.go(user, _.deep_pluck('posts.comments.user.name'), _.count_by, console.log);

// 5.4. 특정인이 comment를 단 posts 거르기

console.log(
  _.filter(posts_with_comments_user, function(post) {
    return _.find(post.comments, function(comment) {
      return comment.user_id == 105;
    })
  })
);