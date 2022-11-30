import { useSelector } from 'react-redux';

function MemberRaid() {
    let state = useSelector((state)=> state );

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
                                    <button className="btn btn-danger" type="button">삭제</button>
                                </div>
                                <div className="list-group">
                                    {
                                        state.raid.modal.members.map((member, i)=>{
                                            return (
                                                <li className="list-group-item" key={i}>
                                                    {
                                                        member.rank === 0 ? 
                                                        <input className="form-check-input me-1" type="checkbox" id={'checkbox_'+i} disabled/> :
                                                        <input className="form-check-input me-1" type="checkbox" id={'checkbox_'+i}/>
                                                    }
                                                    <label className="form-check-label" for={'checkbox_'+i}>
                                                        {member.name}
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* 대기 */}
                            <div className="tab-pane fade" id="waiting" role="tabpanel" aria-labelledby="waiting-list">
                                <div className="d-grid gap-2 mt-2 mb-2">
                                    <button className="btn btn-success" type="button">추가</button>
                                </div>
                                <div className="list-group">
                                    {
                                        state.group.members.map((member, i)=>{
                                            if (state.raid.modal.members.find(x => x._id === member._id)) {
                                                return false;
                                            } else {
                                                return (
                                                    <li className="list-group-item" key={i}>
                                                        {
                                                            member.rank === 0 ? 
                                                            <input className="form-check-input me-1" type="checkbox" id={'checkbox_'+i} disabled/> :
                                                            <input className="form-check-input me-1" type="checkbox" id={'checkbox_'+i}/>
                                                        }
                                                        <label className="form-check-label" for={'checkbox_'+i}>
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
}

export default MemberRaid;