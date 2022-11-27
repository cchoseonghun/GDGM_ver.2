import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../store/slice.user';
import { setGroup } from '../store/slice.group';
import { setRaid } from '../store/slice.raid';


function Login() {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [id, setId] = useState('');
    let [psword, setPsword] = useState('');

    return (
        <>
        <div className='container'>
            <div className="mb-3 mt-5" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                <h1 onClick={()=>{navigate('/')}} className="mt-5">로그인</h1>
                <div className="form-floating mb-1">
                    <input className="form-control" id="id" type="text" onChange={(e)=>{setId(e.target.value)}} />
                    <label htmlFor="id">아이디</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" id="psword" type="password" onChange={(e)=>{setPsword(e.target.value)}} />
                    <label htmlFor="psword">비밀번호</label>
                    <div className="form-text">아직 회원가입을 안하셨다면? <span onClick={()=>{navigate('/register')}} style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>간편 회원가입</span></div>
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
                dispatch(setIsLogin(true));
                dispatch(setGroup({
                    _id: '', 
                    name: '', 
                    members: [], 
                }));
                dispatch(setRaid({}));
                localStorage.setItem('session_user', JSON.stringify(response.data));
                navigate('/');
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('로그인 중 에러 발생'));
        })
    }
}

export default Login;