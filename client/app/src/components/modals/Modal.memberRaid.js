import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function MemberRaid() {
    let state = useSelector((state)=> state );
    let [includedArr, setIncludedArr] = useState([]);
    let [waitingArr, setWaitingArr] = useState([]);

    return (
        <>
        <div className="modal fade" id="MemberRaid" tabIndex="-1" aria-labelledby="MemberRaidLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="MemberRaidLabel">레이드 멤버</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ height: '25em', overflow: 'auto' }}>
                        {/* 소속 and 대기 버튼 */}
                        <div className="list-group list-group-horizontal" id="list-tab" role="tablist">
                                <a className="list-group-item list-group-item-action active" id="included-list" data-bs-toggle="list" href="#included" role="tab" aria-controls="included">소속</a>
                                <a className="list-group-item list-group-item-action" id="waiting-list" data-bs-toggle="list" href="#waiting" role="tab" aria-controls="waiting">대기</a>
                        </div>
                        <div className="tab-content" id="nav-tabContent">
                            {/* 소속 */}
                            <div className="tab-pane fade show active" id="included" role="tabpanel" aria-labelledby="included-list">
                                <div className="d-grid gap-2 mt-2 mb-2">
                                    <button onClick={()=>{removeRaidMembers()}} className="btn btn-danger" type="button">추방</button>
                                </div>
                                <div className="list-group">
                                    {
                                        state.raid.modal.members.map((member, i)=>{
                                            return (
                                                <li className="list-group-item d-flex justify-content-between" key={i}>
                                                    <div>
                                                        {
                                                            member.rank !== 0 ? 
                                                            <input onClick={(e)=>{pushCheckedValueToArrState(e, includedArr, setIncludedArr)}} className="form-check-input me-1" type="checkbox" id={'checkbox_'+i} value={member}/> : ''
                                                        }
                                                        <label className="form-check-label" htmlFor={'checkbox_'+i}>
                                                            {member.name}
                                                        </label>
                                                    </div>
                                                    {
                                                        member.rank === 0 ? 
                                                        <span className="badge bg-primary rounded-pill">생성자</span> : ''
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* 대기 */}
                            <div className="tab-pane fade" id="waiting" role="tabpanel" aria-labelledby="waiting-list">
                                <div className="d-grid gap-2 mt-2 mb-2">
                                    <button onClick={()=>{addRaidMembers()}} className="btn btn-success" type="button">추가</button>
                                </div>
                                <div className="list-group">
                                    {
                                        state.group.members.map((member, i)=>{
                                            if (state.raid.modal.members.find(x => x._id === member._id)) {
                                                return false;
                                            } else {
                                                return (
                                                    <li className="list-group-item" key={i}>
                                                        <input onClick={(e)=>{pushCheckedValueToArrState(e, waitingArr, setWaitingArr)}} className="form-check-input me-1" type="checkbox" id={'checkbox_'+i} value={member}/>
                                                        <label className="form-check-label" htmlFor={'checkbox_'+i}>
                                                            {member.name}
                                                        </label>
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

    function pushCheckedValueToArrState(e, arr, setArr) {
        let temp = arr;
        if (e.target.checked) {
            temp.push(e.target.value);
        } else {
            let i = temp.indexOf(e.target.value);
            temp.splice(i, 1);
        }
        setArr(temp);
    }

    function addRaidMembers() {
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/raid/members', {
            waitingArr
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                // dispatch(setRaid(response.data));
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('레이드 멤버 추가 중 에러 발생'));
        })
    }

    function removeRaidMembers() {
        console.log('includedArr: ');
        console.log(includedArr[0]);
    }
}

export default MemberRaid;