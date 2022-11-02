// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from '../store/slice.user';
import Clock from './Clock'

function Nav() {
    // let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    const navigate = useNavigate();    
    // let session_user = JSON.parse(localStorage.getItem('session_user'));

    return (
        <>
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="navbar-brand" style={{ cursor: 'pointer'}} >Navbar</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="navbar-text">접속id: <b>test</b></span>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <Clock />
                        <button onClick={()=>{logout()}} type="button" className="btn btn-outline-dark">로그아웃</button>
                    </div>
                </div>
            </nav>
        </div>
        </>
    )
            
    function logout(){
        // localStorage.removeItem('session_user');
        dispatch(setIsLogin(false));
        navigate('/');
    }
}

export default Nav;