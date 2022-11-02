import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../store/slice.user';

function Login() {
    let state = useSelector((state)=> state );
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [id, setId] = useState('');
    let [psword, setPsword] = useState('');

    // let [isLogin, setIsLogin] = useState(false);

    return (
        <>
        { state.user.isLogin && <button onClick={()=>{dispatch(setIsLogin(false));}}>로그아웃</button> }
        <div className='container'>
            <div className="mb-3 mt-5" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                <h1 onClick={()=>{navigate('/')}} className="mt-5">공대공머</h1>
                <div className="form-floating mb-3">
                    <input className="form-control" id="id" type="text" onChange={(e)=>{setId(e.target.value)}} />
                    <label htmlFor="id">아이디</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" id="psword" type="password" onChange={(e)=>{setPsword(e.target.value)}} />
                    <label htmlFor="psword">비밀번호</label>
                    <div className="form-text">아직 회원가입을 안하셨다면? <a href="/register">간편 회원가입</a></div>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button" onClick={()=>{login()}}>로그인</button>
                </div>
            </div>
        </div>
        </>
    )

    function login() {
        if(!id) return alert('아이디를 입력해주십시오.');
        if(!psword) return alert('비밀번호를 입력해주십시오.');

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/login', {
            id: id, 
            psword: psword, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                // setIsLogin(true);
                dispatch(setIsLogin(true));
                navigate('/');
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
            // if(parseInt(result.data.code) > 0){
                // localStorage.setItem('session_user', JSON.stringify(result.data.data));
            // }
        }).catch(()=>{
            console.error(new Error('로그인 중 에러 발생'));
        })
    }
}

export default Login;