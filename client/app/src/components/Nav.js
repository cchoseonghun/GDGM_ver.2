import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from '../store/slice.user';
import Clock from './Clock'

function Nav() {
    let dispatch = useDispatch();
    const navigate = useNavigate();    
    
    let session_user = JSON.parse(localStorage.getItem('session_user'));
    let state = useSelector((state)=> state );
    
    return (
        <>
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="navbar-brand" style={{ cursor: 'pointer', marginLeft: '10px'}} >GDGM</div>
                {
                    state.user.isLogin &&
                    <>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="navbar-text"><b>{session_user.name}</b></span>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <Clock />
                            <button onClick={()=>{logout()}} type="button" className="btn btn-outline-dark">로그아웃</button>
                        </div>
                    </div>
                    </>
                }
            </nav>
        </div>
        </>
    )
            
    function logout(){
        dispatch(setIsLogin(false));
        localStorage.removeItem('session_user');
        navigate('/');
    }
}

export default Nav;