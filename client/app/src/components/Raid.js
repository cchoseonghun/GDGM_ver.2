import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import InviteGroup from './modals/Modal.inviteGroup';
import MemberGroup from './modals/Modal.memberGroup';
import NewRaid from './modals/Modal.newRaid';
import { setRaid } from '../store/slice.raid'

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

                    {/* <div className="carousel-item active">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            타이틀
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item">레이드삭제</a></li>
                                        </ul>
                                    </div> 
                                </div>
                                <div>
                                    <button className="btn btn-warning" type="button">0/0</button>
                                    <p className="card-text">2022-11-08 23:10 <span className="badge text-bg-dark">D+95</span></p>
                                    <button className="btn btn-secondary" type="button" disabled>날짜지남</button>
                                </div>
                                <div className="mb-5"></div>
                            </div>
                        </div>
                    </div> */}
                    {
                        state.raid.data.length > 0 ? 
                        state.raid.data?.map((raid, i) => 
                            <div className={i === 0 ? 'carousel-item active' : 'carousel-item'} key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <button className="btn btn-primary" type="button">{raid.name}</button>
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
        </>
    )

    function setUserState(_id_user, state) {
        
    }

    function setUserStateBtn(raid) {
        let state = raid.members.find(x => x._id === session_user._id).state;  
        let dDay = calDday(raid.d_date);  // 0: D-Day, <0: 날짜지남, >0: D-?

        if(dDay < 0){
            return (<button className="btn btn-secondary" type="button" disabled>날짜지남</button>)
        } else {
            if (state) {
                return (<button onClick={setUserState(session_user._id, 0)} className="btn btn-outline-danger" type="button">선택취소</button>)
            } else {
                return (<button onClick={setUserState(session_user._id, 1)} className="btn btn-outline-success" type="button">일정확인</button>)
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
            <button className={`btn ${variant}`} type="button">{contents}</button>
        )
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
}

export default Raid;