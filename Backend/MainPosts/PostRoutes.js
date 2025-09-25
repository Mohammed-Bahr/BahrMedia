// import express from "express";
// import Post from "./PostModel.js";
// const router = express.Router();

// // 📌 Create new post
// router.post("/", async (req, res) => {
//   try {
//     const { caption, media } = req.body;

//     // Normalize media into array of { url, type }
//     let normalizedMedia = [];
//     if (typeof media === "string" && media.trim() !== "") {
//       normalizedMedia = [
//         {
//           url: media,
//           type: media.startsWith("data:video") ? "video" : "image",
//         },
//       ];
//     } else if (Array.isArray(media)) {
//       normalizedMedia = media
//         .filter(Boolean)
//         .map((item) => {
//           if (typeof item === "string") {
//             return {
//               url: item,
//               type: item.startsWith("data:video") ? "video" : "image",
//             };
//           }
//           return item; // assume already { url, type }
//         });
//     }

//     const newPost = new Post({
//       caption,
//       media: normalizedMedia,
//     });

//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Get all posts (feed)
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("user", "username profilePic") // يظهر بيانات المستخدم
//       .populate("comments.user", "username profilePic")
//       .sort({ createdAt: -1 }); // الأحدث الأول

//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Get a single post
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//       .populate("user", "username profilePic")
//       .populate("comments.user", "username profilePic");

//     if (!post) return res.status(404).json({ error: "Post not found" });

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Like / Unlike a post
// router.put("/:id/like", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: "Post not found" });

//     const isLiked = post.likes.includes(req.user.id);

//     if (isLiked) {
//       post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
//     } else {
//       post.likes.push(req.user.id);
//     }

//     await post.save();
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Add a comment
// router.post("/:id/comment", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: "Post not found" });

//     const comment = {
//       user: req.user.id,
//       text: req.body.text,
//     };

//     post.comments.push(comment);
//     await post.save();

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;



import express from "express";
const router = express.Router();
import Post from "./PostModel.js";
// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      category, 
      author, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by author
    if (author) {
      query.author = new RegExp(author, 'i');
    }

    // Search in title and content
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const posts = await Post.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: posts.length,
        totalPosts: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
});

// GET /api/posts/published - Get all published posts
router.get('/published', async (req, res) => {
  try {
    const posts = await Post.findPublished();
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching published posts',
      error: error.message
    });
  }
});

// GET /api/posts/category/:category - Get posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.findByCategory(category);
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts by category',
      error: error.message
    });
  }
});

// GET /api/posts/:id - Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment view count
    await post.incrementViews();

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
});

// POST /api/posts - Create new post
router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Post with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
});

// PUT /api/posts/:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
});

// POST /api/posts/:id/like - Add like to post
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    await post.addLike();

    res.json({
      success: true,
      message: 'Post liked successfully',
      likes: post.likes
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error liking post',
      error: error.message
    });
  }
});

// POST /api/posts/:id/comments - Add comment to post
router.post('/:id/comments', async (req, res) => {
  try {
    const { user, comment } = req.body;

    if (!user || !comment) {
      return res.status(400).json({
        success: false,
        message: 'User and comment are required'
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    await post.addComment(user, comment);

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: post
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
});

// GET /api/posts/:id/comments - Get comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select('comments');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post.comments
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
});

export default router;