import React, { useEffect, useState } from 'react'
import styles from './Blog.module.css'
import Loder from '../../components/Loder/Loder';
import { getAllBlogs } from '../../api/internal';
import { useNavigate } from 'react-router-dom';


function Blogs() {

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async function getAllBlogsApiCall() {
          const response = await getAllBlogs();
    
          if (response.status === 200) {
            setBlogs(response.data.blogs);
          }
        })();
    
        setBlogs([]);
      }, []);

    if(blogs.length === 0){
        return <Loder text='Blogs'/>
    }


  return (
    <div className={styles.blogsWrapper}>
        {blogs.map((blog) => (
            <div id={blog._id} className={styles.blog} onClick={() => navigate(`/blog/${blog._id}`)}>
                <h1>{blog.title}</h1>
                <img src={blog.photo} alt=''/>
                <p>{blog.content}</p>
            </div>
        ))}
    </div>
  )
}

export default Blogs