import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate();

    let [id, setId] = useState('');
    let [name, setName] = useState('');
    let [psword, setPsword] = useState('');
    let [confirmPsword, setConfirmPsword] = useState('');

    return (
        <>
        <div className='container'>
            <div className="mb-3 mt-5" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                <h1 onClick={()=>{navigate('/')}} className="mt-5">회원가입</h1>
                <div className="form-floating mb-1">
                    <input className="form-control" id="id" type="text" onChange={(e)=>{setId(e.target.value)}} />
                    <label htmlFor="id">아이디</label>
                </div>
                <div className="form-floating mb-1">
                    <input className="form-control" id="name" type="text" onChange={(e)=>{setName(e.target.value)}} />
                    <label htmlFor="name">이름</label>
                </div>
                <div className="form-floating mb-1">
                    <input className="form-control" id="psword" type="password" onChange={(e)=>{setPsword(e.target.value)}} />
                    <label htmlFor="psword">비밀번호</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" id="confirmPsword" type="password" onChange={(e)=>{setConfirmPsword(e.target.value)}} />
                    <label htmlFor="confirmPsword">비밀번호 확인</label>
                    <div className="form-text">이미 회원가입을 하셨다면? <a href="/login">로그인</a></div>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button" onClick={()=>{register()}}>회원가입</button>
                </div>
            </div>
        </div>
        </>
    )

    function register() {
        if(!id) return alert('아이디를 입력해주십시오.');
        if(!name) return alert('이름을 입력해주십시오.');
        if(!psword) return alert('비밀번호를 입력해주십시오.');
        if(psword !== confirmPsword) return alert('비밀번호가 일치하지 않습니다.');

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/regiser', {
            id: id, 
            name: name, 
            psword: psword, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                navigate('/login');
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('회원가입 중 에러 발생'));
        })
    }
}

export default Register;