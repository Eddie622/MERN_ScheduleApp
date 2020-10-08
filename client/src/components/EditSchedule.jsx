import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import moment from 'moment';

const EditSchedule = props => {
    const [activity, setActivity] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [duration, setDuration] = useState(0);
    const [units, setUnits] = useState("minutes");
    const [errors, setErrors] = useState({});

    useEffect( () => {
        axios.get(`http://localhost:8000/api/schedule/${props._id}`)
            .then( res => {
                console.log(res);
                setActivity(res.data.activity);
                setDescription(res.data.description);
                setStart(moment(res.data.start).format('YYYY-MM-DDTHH:mm'));
                setDuration(res.data.duration);
                setUnits(res.data.units);
            }).catch(errors => console.log(errors));
    }, [props._id]);

    const UpdateSchedule = e => {
        e.preventDefault();
        const scheduleItem = {activity, description, start, duration, units};
        axios.put(`http://localhost:8000/api/schedule/${props._id}`, scheduleItem)
            .then(res => {
                console.log(res);
                if(res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate("/");
                }
            }).catch(err => console.log(err));
    };

    const remove = () => {
        axios.delete(`http://localhost:8000/api/schedule/${props._id}`)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch( err => console.log(err));
    };

    return (
        <div className="row">
            <form className="col-sm-8 offset-sm-2" onSubmit={UpdateSchedule}>
                <div className="form-group">
                    <label>Activity</label>
                    <input type="text" className="form-control" onChange={e => setActivity(e.target.value)} value={activity}/>
                    { errors.activity ? <p className="text-danger">{errors.activity.properties.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                    { errors.description ? <p className="text-danger">{errors.description.properties.message}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Start</label>
                    <input type="datetime-local" className="form-control" onChange={e => setStart(e.target.value)} value={start}/>
                    { errors.start ? <p className="text-danger">{errors.start.properties.message}</p> : ""}
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Duration</label>
                            <input type="number" className="form-control" onChange={e => setDuration(e.target.value)} value={duration}/>
                            { errors.duration ? <p className="text-danger">{errors.duration.properties.message}</p> : ""}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Units</label>
                            <select className="form-control" onChange={e => setUnits(e.target.value)} value={units}>
                                <option>minutes</option>
                                <option>hours</option>
                                <option>days</option>
                            </select>
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Update"/>
            </form>
            <div className="col-sm-8 offset-sm-2 mt-3">
                <button className="btn btn-danger btn-block" onClick={remove}>Remove</button>
            </div>
        </div>
    )
};

export default EditSchedule;