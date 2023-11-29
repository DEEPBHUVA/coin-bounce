import React, { useEffect, useState } from 'react'
import styles from './BlogDetails.module.css'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog, getBlogById, getCommentById, postComment } from '../../api/internal';
import Loder from '../../components/Loder/Loder';
import CommentList from '../../components/CommentList/CommentList';

function BlogDetails() {
    const [blog, setBlog] = useState('');
    const [comments, setComments] = useState([]);
    const [ownBlog, setOwnBlog] = useState('');
    const [newComment, setNewComment] = useState('');
    const [reload, setReload] = useState(false);

    const params = useParams();
    const blogId = params.id;

    const navigate = useNavigate();

    const username = useSelector(state => state.user.username);
    const userId = useSelector(state => state.user._id);

    const postCommentHandler = async () => {
        const data = {
            author: userId,
            blog: blogId,
            content: newComment,
        };

        const response = await postComment(data);

        if (response.status === 201){
            setNewComment("");
            setReload(!reload);
        }    
    }

    const deleteBlogHandler = async () => {
        const response = await deleteBlog(blogId);

        if (response.status === 200) {
            navigate("/");
        }
    }

    useEffect(() => {
        async function getBlogDetails() {
          const commentResponse = await getCommentById(blogId);
          if (commentResponse.status === 200) {
            setComments(commentResponse.data.data);
          }
    
          const blogResponse = await getBlogById(blogId);
          if (blogResponse.status === 200) {
            // set ownership
            setOwnBlog(username === blogResponse.data.blog.authorUsername);
            setBlog(blogResponse.data.blog);
          }
        }
        getBlogDetails();
      }, [reload]);

    if(blog.length === 0){
        return <Loder text='Blog details'/>
    }

  return (
    <div className={styles.detailsWrapper}>
        <div className={styles.left}>
            <h1 className={styles.title}>{blog.title}</h1>

            <div className={styles.meta}>
                <p>
                    @{blog.authorUsername + ' on ' + new Date(blog.createdAt)}
                </p>
            </div>

            <div className={styles.photo}>
                <img src={blog.photo} width={250} height={250} alt=''/>
            </div>
            <p className={styles.content}>{blog.content}</p>
                {ownBlog && (
                    <div className={styles.controls}>
                        <button className={styles.editButton} 
                        onClick={() => {navigate(`/blog-update/${blog._id}`)}}>
                            Edit
                        </button>

                        <button className={styles.deleteButton} 
                        onClick={deleteBlogHandler}>
                            Delete
                        </button>
                    </div>
                )}
        </div>

        <div className={styles.right}>
            <div className={styles.commentWrapper}>
            <CommentList comments={comments} /> 
                <div className={styles.postComment}>
                <input
                    className={styles.input}
                    placeholder="comment goes here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className={styles.postCommentButton} onClick={postCommentHandler}>Post</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogDetails