import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import InviteGroup from './modals/Modal.inviteGroup';
import MemberGroup from './modals/Modal.memberGroup';
import MemberRaid from './modals/Modal.memberRaid';
import NewRaid from './modals/Modal.newRaid';
import { setRaid, setModal } from '../store/slice.raid'
import { setAlert } from '../store/slice.alert';


function Raid() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let state = useSelector((state)=> state );

    let session_user = JSON.parse(localStorage.getItem('session_user'));

    useEffect(() => {
        getRaidList();
    }, []);

    return (
        <>
        <div className="container mt-5" style={{ textAlign: 'center' }}>
            <h1>{state.group.name}</h1>
            <div className="btn-group mb-2">
                <button onClick={()=>{navigate('/')}} className="btn btn-outline-dark" type="button">뒤로</button>
                <button className="btn btn-outline-success ms-1" 
                type="button" data-bs-toggle="modal" data-bs-target="#InviteGroup">초대코드</button>
                <button className="btn btn-outline-success ms-1" 
                type="button" data-bs-toggle="modal" data-bs-target="#MemberGroup">멤버</button>
                <button className="btn btn-outline-primary ms-1" 
                type="button" data-bs-toggle="modal" data-bs-target="#NewRaid">레이드생성</button>
            </div>
            <div id="carousel-container" className="carousel carousel-dark slide" data-bs-ride="false">
                <div className="carousel-indicators">
                    {
                        state.raid.data.length > 0 ?
                        state.raid.data?.map((raid, i) => 
                            i === 0 ? <button key={i} type="button" data-bs-target="#carousel-container" data-bs-slide-to={i} aria-label={`Slide ${(i+1)}`} className="active" aria-current="true"></button>
                            : <button key={i} type="button" data-bs-target="#carousel-container" data-bs-slide-to={i} aria-label={`Slide ${(i+1)}`}></button>
                        ) :
                        <></>
                    }
                </div>
                <div className="carousel-inner">
                    {
                        state.raid.data.length > 0 ? 
                        state.raid.data?.map((raid, i) => 
                            <div className={i === 0 ? 'carousel-item active' : 'carousel-item'} key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            {
                                                raid.members.find(x => x.rank === 0)._id === session_user._id ? 
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {raid.name}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li><a onClick={()=>{deleteRaid(raid)}} className="dropdown-item">레이드삭제</a></li>
                                                    </ul>
                                                </div>   :
                                                <button className="btn btn-primary" type="button">{raid.name}</button>
                                            }
                                        </div>
                                        <div>
                                            {/* 인원 */}
                                            {getMemberStateBtn(raid)}
                                            {/* 날짜 */} 
                                            <p className="card-text mt-3"><span className="badge text-bg-light">{raid.d_date} {raid.d_time}</span> {getDdayTag(raid.d_date)}</p>
                                            {/* 상태 */}
                                            {setUserStateBtn(raid)}
                                        </div>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <h4>소속된 레이드 정보가 없습니다.</h4>
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel-container" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel-container" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <InviteGroup />
        <MemberGroup />
        <NewRaid getRaidList={getRaidList}/>
        <MemberRaid />
        </>
    )


    function deleteRaid(raid) {
        const _id_raid = raid._id;
        const answer = window.confirm(`삭제하면 [${raid.name}]의 일정과 멤버 목록은 DB에서 완전히 제거됩니다.\n정말 레이드를 삭제하시겠습니까?`);

        if (answer) {
            const server_address = process.env.REACT_APP_SERVER_ADDRESS;
            axios.delete(server_address + '/raid', {
                data: {
                    _id_raid, 
                    _id_user: session_user._id, 
                }
            }).then((res)=>{
                const response = res.data;
                if(response.success){
                    getRaidList();
                    showAlert('success', response.msg);
                } else {
                    showAlert('danger', response.msg);
                }
            }).catch(()=>{
                console.error(new Error('레이드 삭제 중 에러 발생'));
            })
        }
    }

    function setUserState(_id_raid, state) {
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.patch(server_address + '/raid/members', {
            _id_raid, 
            _id_user: session_user._id, 
            state_user: state, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                getRaidList();
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('일정 확인 상태 변경 중 에러 발생'));
        })
    }

    function setUserStateBtn(raid) {
        let state = raid.members.find(x => x._id === session_user._id).state;  
        let dDay = calDday(raid.d_date);  // 0: D-Day, <0: 날짜지남, >0: D-?

        if(dDay < 0){
            return (<button className="btn btn-secondary" type="button" disabled>날짜지남</button>)
        } else {
            if (state) {
                return (<button onClick={()=>{setUserState(raid._id, 0)}} className="btn btn-outline-danger" type="button">선택취소</button>)
            } else {
                return (<button onClick={()=>{setUserState(raid._id, 1)}} className="btn btn-outline-success" type="button">일정확인</button>)
            }
        }
    }

    function getMemberStateBtn(raid) {
        let variant = 'btn-warning';
        let contents = '?/?';

        const members = raid.members;
        const num_all = members.length;
        const num_ready = members.filter(x => x.state === 1).length;

        if (num_ready === num_all) {
            variant = 'btn-success';
        } else {
            variant = 'btn-warning';
        }
        contents = num_ready + '/' + num_all;

        return (
            <button onClick={()=>{setRaidModal(raid._id)}} data-bs-toggle="modal" data-bs-target="#MemberRaid" className={`btn ${variant}`} type="button">{contents}</button>
        )
    }

    function setRaidModal(_id) {
        const raidInfo = state.raid.data.find(x => x._id === _id);
        dispatch(setModal(raidInfo));
    }

    function calDday(targetDate){
        let dday = new Date(targetDate);
        let today = new Date();
        dday.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        let gap = dday.getTime() - today.getTime();
        let result = Math.ceil(gap / (1000 * 60 * 60 * 24));
        return result;
    }

    function getDdayTag(targetDate){
        let dDay = calDday(targetDate);
        if(dDay === 0) {
            return (<span className="badge rounded-pill text-bg-danger">D-DAY</span>);
        } else if(dDay > 0){
            return (<span className="badge rounded-pill text-bg-success">D-{dDay}</span>);
        } else {
            return (<span className="badge rounded-pill text-bg-dark">D+{-1*dDay}</span>);
        }
    }

    function getRaidList() {
        let _id_group = state.group._id;

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/raid', {
            params: { 
                _id_group, 
                _id_user: session_user._id, 
            }
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                dispatch(setRaid(response.data));
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('소속 공격대 레이드 리스트업 중 에러 발생'));
        })
    }

    function showAlert(variant, message) {
        dispatch(setAlert({switch: true, variant: variant, message: message}));
        setTimeout(()=>{
            dispatch(setAlert({switch: false, variant: '', content: ''}));
        }, 5000);
        document.querySelector('.btn-close').click();
    }
}

export default Raid;