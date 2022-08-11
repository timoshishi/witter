export interface Poster {
  username: string;
  userDescription?: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
}
export interface Post {
  postId: string;
  viewsCount: number;
  commentsCount: number;
  commentsToRender: [PostComment?, PostComment?, PostComment?];
  hasLiked: boolean;
  isFollowing: boolean;
  repostsCount: number;
  likesCount: number;
  imageUrl: string;
  poster: Poster;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface PostComment {
  username: string;
  title: string;
}

export interface PostResponse {
  data: Post[];
  total: number;
  page: number;
}
