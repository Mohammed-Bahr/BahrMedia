// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId, // reference to User model
//       ref: "User",
//       required: false,
//     },
//     caption: {
//       type: String,
//       maxlength: 500,
//     },
//     media: [
//       {
//         url: { type: String, required: true }, // image/video url
//         type: { type: String, enum: ["image", "video"], required: false },
//       },
//     ],
//     likes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     comments: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         text: { type: String, required: true, maxlength: 300 },
//         createdAt: { type: Date, default: Date.now },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Post = mongoose.model("Post", postSchema);

// export default Post;



import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  featuredImage: {
    type: String,
    default: null
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Pre-save middleware to generate slug
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

// Instance method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to add like
postSchema.methods.addLike = function() {
  this.likes += 1;
  return this.save();
};

// Instance method to add comment
postSchema.methods.addComment = function(user, comment) {
  this.comments.push({ user, comment });
  return this.save();
};

// Static method to find published posts
postSchema.statics.findPublished = function() {
  return this.find({ status: 'published' }).sort({ createdAt: -1 });
};

// Static method to find posts by category
postSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'published' }).sort({ createdAt: -1 });
};

const Post = mongoose.model('Post', postSchema);

export default Post;