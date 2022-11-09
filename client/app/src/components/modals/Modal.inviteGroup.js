import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../store/slice.alert';

function InviteGroup() {
    let dispatch = useDispatch();
    let state = useSelector((state)=> state );
    let [code, setCode] = useState('');

    useEffect(() => {
        getCode();
    }, [])

    return (
        <>
        <div className="modal fade" id="InviteGroup" tabIndex="-1" aria-labelledby="InviteGroupLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="InviteGroupLabel">공격대 초대코드</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input id="code" className="form-control" type="text" value={code} disabled readOnly />
                            <button onClick={(e)=>{copyCode(e)}} className="btn btn-outline-primary" type="button">복사</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

    function getCode() {
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/group/code', {
            params: {group_idx: state.group.idx}, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                setCode(response.data);
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('초대코드 받는 중 에러 발생'));
        })
    }

    function copyCode(e) {
        if (navigator.clipboard) {
            navigator.clipboard
            .writeText(code)
            .then(() => {
                showAlert('success', '초대코드가 클립보드에 복사되었습니다.');
            })
            .catch(() => {
                showAlert('danger', '초대코드 복사를 다시 시도해주세요.');
            });
        } else {
            showAlert('danger', '클립보드 저장 기능을 지원할 수 없는 환경입니다.');
        }
    }

    function showAlert(variant, message) {
        dispatch(setAlert({switch: true, variant: variant, message: message}));
        setTimeout(()=>{
            dispatch(setAlert({switch: false, variant: '', content: ''}));
        }, 5000);
        document.querySelector('.btn-close').click();
    }
}

export default InviteGroup;