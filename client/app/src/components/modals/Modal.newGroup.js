import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAlert } from '../../store/slice.alert';

function NewGroup() {
    let dispatch = useDispatch();

    let [input, setInput] = useState('');
    let session_user = JSON.parse(localStorage.getItem('session_user'));

    return (
        <>
        <div className="modal fade" id="NewGroup" tabIndex="-1" aria-labelledby="NewGroupLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="NewGroupLabel">공격대 생성</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input onChange={(e)=>{setInput(e.target.value)}} type="text" className="form-control" placeholder="" />
                            <button onClick={()=>{newGroup()}} className="btn btn-outline-primary" type="button">생성</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

    function newGroup() {
        if(!input) return alert('공격대 이름을 입력해주십시오.');

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/group', {
            name: input, 
            user_id: session_user.id, 
            user_name: session_user.name, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                dispatch(setAlert({switch: true, variant: 'success', message: response.msg}));
                setTimeout(()=>{
                    dispatch(setAlert({switch: false, variant: '', content: ''}));
                }, 5000);
                document.querySelector('.btn-close').click();
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('공격대 생성 중 에러 발생'));
        })
    }
}

export default NewGroup;