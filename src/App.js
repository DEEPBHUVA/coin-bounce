import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import styles from './App.module.css'
import Protected from './components/Protected/Protected';
import Error from './pages/Error/Error';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import Signup from './pages/signup/Signup';
import Crypto from './pages/Crypto/Crypto';
import Blogs from './pages/Blog/Blogs';
import SubmitBlog from './pages/SubmitBlog/SubmitBlog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import UpdateBlog from './pages/UpdateBlog/UpdateBlog';

function App() {

  const isAuth = useSelector(state => state.user.auth);
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar/>
          <Routes>

            <Route path='/' exact 
            element={
            <div className={styles.main}>
            <Home/>
            </div>
            }/>

            <Route path='crypto' exact element=
            {<div className={styles.main}><Crypto/></div>}
            />

            <Route path='blogs' exact element=
            {<Protected isAuth={isAuth}><div className={styles.main}><Blogs/></div></Protected>}
            />

            <Route path='blog/:id' exact element=
            {<Protected isAuth={isAuth}><div className={styles.main}><BlogDetails/></div></Protected>}
            />

            <Route path='blog-update/:id' exact element=
            {<Protected isAuth={isAuth}><div className={styles.main}><UpdateBlog/></div></Protected>}
            />

            <Route path='submit' exact element=
            {<Protected isAuth={isAuth}><div className={styles.main}><SubmitBlog/></div></Protected>}
            />

            <Route path='signup' exact element=
            {<div className={styles.main}><Signup/></div>}
            />

            <Route path='login' exact element=
            {<div className={styles.main}><Login/></div>}
            />

            <Route path='*' element={<div className={styles.main}><Error/></div>}/>

          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
