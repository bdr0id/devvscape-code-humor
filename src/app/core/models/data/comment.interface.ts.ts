export interface Comment {
  id?: string;
  postedBy: string;
  postId?: string;
  displayName: string;
  text: string;
  stars: number;
  likedBy: string[];
  createdAt: Date;
  parentCommentId?: string; // ID of the parent comment if this is a reply
  replies?: Comment[]; // Array of replies to this comment
}
