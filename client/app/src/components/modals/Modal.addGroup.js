import { useState } from 'react';

function AddGroup() {
    let [input, setInput] = useState('');

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
                            <input onChange={(e)=>{setInput(e.target.value)}} type="text" className="form-control" placeholder="초대코드 입력 ex) ABCDE" />
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

    }
}

export default AddGroup;