import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import moment from 'moment';

const Display = props => {

    const [all, setAll] = useState([]);
    const [showPast, setShowPast] = useState(false);
    const [activities, setActivities] = useState([]);

    const fetchActivities = () => {
        axios.get("http://localhost:8000/api/schedule")
            .then(res => {
                console.log(res);
                setAll(res.data);
                // setActivities(res.data)
                // Filter out past dates
                setActivities(res.data.filter( a => new Date(a.start) > new Date()));
            })
            .catch( err => console.log(err));
    }

    useEffect( () => {
        fetchActivities();
    }, []);

    const remove = _id => {
        axios.delete(`http://localhost:8000/api/schedule/${_id}`)
            .then(res => {
                console.log(res);
                fetchActivities();
            })
            .catch( err => console.log(err));
    }

    const toggle = e => {
        if(showPast) {
            setActivities(all.filter( a => new Date(a.start) > new Date()));
        }
        else {
            setActivities(all);
        }
        setShowPast(!showPast);
    }

    return (
        <div>
            { showPast ? <button className="btn btn-info mb-3" onClick={toggle}>Hide Past Activities</button> : 
            <button className="btn btn-outline-info mb-3" onClick={toggle}>Show Past Activities</button> }
            {activities.map( (act, i) => 
                <div className="card mb-3" key={act._id}>
                    <div className="card-header bg-primary text-light">{act.activity}</div>
                    <div className="card-body">
                        <p>Description: {act.description}</p>
                        <p>Start: {moment(act.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <p>Duration: {act.duration} {act.units}</p>
                        <Link className="btn btn-outline-primary" to={`/edit/${act._id}`}>Edit</Link>
                        <button className="btn btn-outline-danger float-right" onClick={e => remove(act._id)}>Remove</button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Display;