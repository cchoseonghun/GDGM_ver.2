import { useSelector } from 'react-redux';

function MemberGroup() {
    let state = useSelector((state)=> state );

    return (
        <>
        <div className="modal fade" id="MemberGroup" tabIndex="-1" aria-labelledby="MemberGroupLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="MemberGroupLabel">공격대 멤버</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ height: '25em', overflow: 'auto' }}>
                        <ul className="list-group">
                            {
                                state.group.members.map((member, i) => 
                                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                        {member.name}
                                        {member.rank === 0 ? <span className="badge bg-primary rounded-pill">리더</span> : ''}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MemberGroup;