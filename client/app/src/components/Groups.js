import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NewGroup from './modals/Modal.newGroup';
import AddGroup from './modals/Modal.addGroup';
import { setGroup } from '../store/slice.group';

function Groups() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let state = useSelector((state)=> state );

    let session_user = JSON.parse(localStorage.getItem('session_user'));
    let [groupList, setGroupList] = useState({});

    useEffect(() => {
        getGroupList();
    }, [state.alert.switch]);

    return (
        <>
        <div className="container mt-5" style={{ textAlign: 'center' }}>
            <div className="btn-group mb-2">
                <button className="btn btn-outline-primary btn-lg" 
                    type="button" data-bs-toggle="modal" data-bs-target="#NewGroup">공격대 생성</button>
                <button className="btn btn-outline-primary btn-lg" 
                    type="button" data-bs-toggle="modal" data-bs-target="#AddGroup">공격대 추가</button>
            </div>
            <div className="card" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="card-body">
                <div className="d-grid gap-2">
                    {
                        groupList.length > 0 ?
                            groupList.map( (group, i) => 
                                <button onClick={()=>{selectGroup(group.idx)}} key={i} className="btn btn-success btn-lg" type="button">{group.name}</button>
                            ) : 
                            <button className="btn btn-secondary btn-lg" type="button">가입된 공격대가 없습니다.</button>
                    }
                    </div>
                </div>
            </div>
        </div>
        <NewGroup />
        <AddGroup />
        </>
    )

    function selectGroup(idx) {
        const group = groupList.filter((group) => group.idx === idx);
        dispatch(setGroup(group[0]));
        navigate('/raid');
    }

    function getGroupList() {
        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.get(server_address + '/group/list', {
            params: {user_id: session_user.id}, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                setGroupList(response.data);
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('소속 공격대 리스트업 중 에러 발생'));
        })
    }
}

export default Groups;