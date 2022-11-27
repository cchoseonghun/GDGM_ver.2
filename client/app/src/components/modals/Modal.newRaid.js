import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setAlert } from '../../store/slice.alert';

function NewRaid(props) {
    let dispatch = useDispatch();

    let state = useSelector((state)=> state );
    let session_user = JSON.parse(localStorage.getItem('session_user'));

    let [name, setName] = useState('');
    let [d_date, setD_date] = useState('');
    let [d_time, setD_time] = useState('');

    return (
        <>
        <div className="modal fade" id="NewRaid" tabIndex="-1" aria-labelledby="NewRaidLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="NewRaidLabel">레이드 추가</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">레이드 이름</label>
                            <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" id="name" value={name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="d_date" className="form-label">디데이 날짜</label>
                            <input onChange={(e)=>{setD_date(e.target.value)}} type="date" className="form-control" id="d_date" value={d_date} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="d_time" className="form-label">디데이 시간</label>
                            <input onChange={(e)=>{setD_time(e.target.value)}} type="time" className="form-control" id="d_time" value={d_time}/>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">닫기</button>
                            <button onClick={()=>{newRaid()}} type="button" className="btn btn-primary">추가</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

    function newRaid() {
        if(!name) return alert('레이드 이름을 입력해주십시오.');
        if(!d_date) return alert('날짜를 선택해주십시오.');
        if(!d_time) return alert('시간을 선택해주십시오.');

        const server_address = process.env.REACT_APP_SERVER_ADDRESS;
        axios.post(server_address + '/raid', {
            name, 
            d_date, 
            d_time, 
            _id_master: session_user._id,
            id_master: session_user.id,  
            name_master: session_user.name, 
            _id_group: state.group._id, 
            name_group: state.group.name, 
        }).then((res)=>{
            const response = res.data;
            if(response.success){
                setName('');
                setD_date('');
                setD_time('');
                props.getRaidList();

                dispatch(setAlert({switch: true, variant: 'success', message: response.msg}));
                setTimeout(()=>{
                    dispatch(setAlert({switch: false, variant: '', content: ''}));
                }, 5000);
                document.querySelectorAll('.btn-close')[2].click();
            } else {
                if(response.err) return alert(response.err);
                alert(response.msg);
            }
        }).catch(()=>{
            console.error(new Error('레이드 생성 중 에러 발생'));
        });
    }
}

export default NewRaid;