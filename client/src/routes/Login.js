import axios from 'axios';
import { useState } from 'react';

function Login() {
    let [id, setId] = useState('');
    let [psword, setPsword] = useState('');

    return (
        <>
        <div className="login-page">
            <h1>login page</h1>
            <div className="form">
            {/* <form className="login-form"> */}
                <input onChange={(e)=>{setId(e.target.value)}} type="text" placeholder="아이디"/>
                <input onChange={(e)=>{setPsword(e.target.value)}} type="password" placeholder="비밀번호"/>
                <button onClick={()=>login()}>로그인</button>
                <p className="message">Not registered? <a href="/register">간편 회원가입</a></p>
            {/* </form> */}
            </div>
        </div>
        </>
    )

    function login() {
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/login', {
            id: id, 
            psword: psword, 
        }).then((result)=>{
            console.log(result.data);
            // if(parseInt(result.data.code) > 0){
                // dispatch(setLogin(result.data.data));
                // localStorage.setItem('session_user', JSON.stringify(result.data.data));
                // dispatch(setUser(1));
            // }
        }).catch(()=>{
            console.log('axios 통신실패');
        })
    }
}

export default Login;