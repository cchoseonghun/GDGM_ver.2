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
                        state.raid.data.map((raid, i) => 
                            i === 0 ? <button key={i} type="button" data-bs-target="#carousel-container" data-bs-slide-to={i} aria-label={`Slide ${(i+1)}`} className="active" aria-current="true"></button>
                            : <button key={i} type="button" data-bs-target="#carousel-container" data-bs-slide-to={i} aria-label={`Slide ${(i+1)}`}></button>
                        )
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
                        state.raid.data.map((raid, i) => 
                            <div className={i === 0 ? 'carousel-item active' : 'carousel-item'} key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <button className="btn btn-primary" type="button">{raid.name}</button>
                                        </div>
                                        <div>
                                            {/* 인원 */}
                                            <button className="btn btn-warning" type="button">5/10</button>
                                            {/* 날짜 */} 
                                            <p className="card-text">{raid.d_date} {raid.d_time} {getDdayTag(raid.d_date)}</p>
                                            {/* 상태 */}
                                            <button className="btn btn-secondary" type="button" disabled>날짜지남</button>
                                        </div>
                                        <div className="mb-5"></div>
                                    </div>
                                </div>
                            </div>
                        )
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
        <NewRaid />
        </>
    )

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
        let result = calDday(targetDate);
        if(result === 0) {
            return (<span className="badge text-bg-danger">D-DAY</span>);
        } else if(result > 0){
            return (<span className="badge text-bg-success">D-{result}</span>);
        } else {
            return (<span className="badge text-bg-dark">D+{-1*result}</span>);
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