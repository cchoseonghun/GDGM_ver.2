import { useSelector } from 'react-redux';
import axios from 'axios';
import NewGroup from './modals/Modal.newGroup';
import AddGroup from './modals/Modal.addGroup';
import { useEffect, useState } from 'react';

function Groups() {
    let state = useSelector((state)=> state );
    let session_user = JSON.parse(localStorage.getItem('session_user'));
    let [groupList, setGroupList] = useState({});

    useEffect(() => {
        getGroups();
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
                                <button key={i} className="btn btn-success btn-lg" type="button">{group.name}</button>
                            ) : 
                            <button className="btn btn-secondary btn-lg" type="button">가입된 공격대가 없습니다.</button>
                    }
                    </div>
                </div>
            </div>
        </div>
        <NewGroup />
        <AddGroup />
        {/* { state.modal.show && <ModalGroup /> } */}

        {/* { state.modal.modalName == 'AddGroup' && <AddGroup /> } */}

        {/* <Container className="mt-5">
            <div className="btn-group mb-2">
                <Button onClick={()=>{showModal('AddGroup')}} variant="outline-primary" >공대추가</Button>
            </div>
            <Card className="text-center" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Card.Body>
                <div className='d-grid gap-2'>
                {
                    list.length > 0 ?
                    list.map( (a, i) => 
                        <Button key={i} onClick={()=>{selectGroup(a._id, a.name, a.members)}} variant="success" size="lg">{a.name}</Button>
                        ) : 
                        <Button variant="secondary" size="lg">가입된 공격대가 없습니다.</Button>
                }
                </div>
            </Card.Body>
            </Card>
        </Container> */}
        </>
    )

    function getGroups() {
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