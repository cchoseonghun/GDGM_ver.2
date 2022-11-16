import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAlert } from '../../store/slice.alert';

function AddGroup() {
    let dispatch = useDispatch();

    let [input, setInput] = useState('');
    let session_user = JSON.parse(localStorage.getItem('session_user'));

    return (
        <>
        <div className="modal fade" id="AddGroup" tabIndex="-1" aria-labelledby="AddGroupLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="AddGroupLabel">공격대 추가</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input onChange={(e)=>{setInput(e.target.value)}} type="text" className="form-control" placeholder="초대코드 입력 ex) ABCDE" value={input}/>
                            <button onClick={()=>{addGroup()}} className="btn btn-outline-primary" type="button">추가</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

    function addGroup() {
        if(!input) return alert('공격대 코드를 입력해주십시오.');

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/group/member', {
            code: input, 
            _id_user: session_user._id, 
            id_user: session_user.id, 
            name_user: session_user.name, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                setInput('');
                showAlert('success', response.msg);
            } else {
                showAlert('danger', response.msg);
            }
        }).catch(()=>{
            console.error(new Error('공격대 추가 중 에러 발생'));
        })
    }

    function showAlert(variant, message) {
        dispatch(setAlert({switch: true, variant: variant, message: message}));
        setTimeout(()=>{
            dispatch(setAlert({switch: false, variant: '', content: ''}));
        }, 5000);
            document.querySelectorAll('.btn-close')[1].click();
    }
}

export default AddGroup;