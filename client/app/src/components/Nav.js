import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Clock from './Clock'
import { setIsLogin } from '../store/slice.user';
import { setAlert } from '../store/slice.alert';

function Nav() {
    let dispatch = useDispatch();
    const navigate = useNavigate();    
    
    let session_user = JSON.parse(localStorage.getItem('session_user'));
    let state = useSelector((state)=> state );
    
    return (
        <>
        <div className="container">
            <nav className="navbar navbar-expand-lg">
                <div onClick={()=>{navigate('/')}} className="navbar-brand" style={{ cursor: 'pointer' }} >GDGM</div>
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
            { 
                state.alert.switch && 
                <div className={'alert alert-'+state.alert.variant} role={state.alert.variant} style={{ textAlign: 'center' }}>
                    {state.alert.message}
                    <button onClick={()=>{hideAlert()}} type="button" className="btn-close float-end"></button>
                </div> 
            }
        </div>
        </>
    )

    function hideAlert() {
        dispatch(setAlert({switch: false, variant: '', content: ''}));
    }
            
    function logout(){
        dispatch(setIsLogin(false));
        localStorage.removeItem('session_user');
        navigate('/');
    }
}

export default Nav;