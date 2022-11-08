// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Raid() {
    let navigate = useNavigate();
    // let dispatch = useDispatch();
    let state = useSelector((state)=> state );

    // let session_user = JSON.parse(localStorage.getItem('session_user'));

    useEffect(() => {
        // getRaidList();
    }, []);

    return (
        <>
        <div className="container mt-5" style={{ textAlign: 'center' }}>
            <h1>{state.group.name}</h1>
            <div className="btn-group mb-2">
                <button onClick={()=>{navigate('/')}} className="btn btn-outline-dark" type="button">뒤로</button>
                <button className="btn btn-outline-success ms-1" type="button">초대코드</button>
                <button className="btn btn-outline-success ms-1" type="button">멤버</button>
                <button className="btn btn-outline-primary ms-1" type="button">레이드추가</button>

                {/* <Button onClick={()=>{navigate('/')}} variant="outline-dark" >뒤로</Button>
                <Button className="ms-1" onClick={()=>{showModal('InviteCode')}} variant="outline-success" >초대코드</Button>
                <Button className="ms-1" onClick={()=>{showModal('GroupMember')}} variant="outline-success" >멤버</Button>
                <Button className="ms-1" onClick={()=>{showModal('AddRaid')}} variant="outline-primary" >레이드추가</Button> */}
            </div>
            <div id="carousel-container" className="carousel carousel-dark slide" data-bs-ride="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true" ></button>
                    <button type="button" data-bs-target="#carousel-container" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <button className="btn btn-primary" type="button">타이틀</button>
                                    {/* 
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            타이틀
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item">레이드삭제</a></li>
                                        </ul>
                                    </div> 
                                    */}
                                </div>
                                <div>
                                    <button className="btn btn-warning" type="button">0/0</button>
                                    <p className="card-text">2022-11-08 23:10 <span className="badge text-bg-dark">D+95</span></p>
                                    <button className="btn btn-secondary" type="button" disabled>날짜지남</button>
                                </div>
                                <div className="mb-5"></div>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <button className="btn btn-primary" type="button">2222</button>
                                </div>
                                <div>
                                    <button className="btn btn-warning" type="button">5/10</button>
                                    <p className="card-text">2022-11-08 23:10 <span className="badge text-bg-dark">D+95</span></p>
                                    <button className="btn btn-secondary" type="button" disabled>날짜지남</button>
                                </div>
                                <div className="mb-5"></div>
                            </div>
                        </div>
                    </div>

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
        </>
    )

    // function getRaidList() {
    //     // console.log(state.group);
    // }
}

export default Raid;