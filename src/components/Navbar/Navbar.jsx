import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../api/internal';
import { resetUser } from '../../store/userSlice';

function Navbar() {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.user.auth);
  
    const handleSignout = async () => {
      await signout();
      dispatch(resetUser());
    };

  return (
    <> 
        <nav className={styles.navbar}>
            <NavLink className={`${styles.logo}`}>CoinBounce</NavLink>

            <NavLink to='/' className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>
                Home
            </NavLink>

            <NavLink to='/crypto' className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>
                Cryptocurrencies
            </NavLink>

            <NavLink to='blogs' className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>
                Blogs
            </NavLink>

            <NavLink to='/submit' className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>
                Submit a BLog
            </NavLink>

            {isAuthenticated ? 
            <div>
                <NavLink><button className={styles.signOutButton} onClick={handleSignout}>Sign Out</button></NavLink>
            </div> :
            <div>
            <NavLink to='login' className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>
                <button className={styles.loginButton}>Log In</button>
            </NavLink>

            <NavLink to='signup' className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>
                <button className={styles.signUpButton}>Sign Up</button>

            </NavLink>
            </div>

            }
        </nav>
        <div className={styles.saparater}></div>
    </>
  )
}

export default Navbar