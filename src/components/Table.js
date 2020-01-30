import React from 'react'
export default function Table(props) {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Technical Skills</th>
                        <th scope="col">Experience</th>
                        <th scope="col">Applied Date</th>
                        <th scope="col">View Details</th>
                        <th scope="col">Update Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // props.showApplications ? <h1>loading..</h1> :
                        (
                            props.showApplications.map(application => {
                                return (
                                        <tr key={application._id}>
                                            <td>{application.name}</td>
                                            <td>{application.skills}</td>
                                            <td>{application.experience}</td>
                                            <td>{application.createdAt.split('T')[0]}</td>
                                            <td><button className="btn btn-info " data-toggle="modal" data-target="#exampleModalLong" onClick={() => props.handleViewDetails(application._id)}>View Details</button></td>
                                            <td>
                                                {
                                                    application.status === "applied" ?
                                                        <>
                                                            <button className="btn btn-success mb-1" name="shortlisted" onClick={(e) => props.handleApplicatonStatus(e, application._id)} >Shortlist</button>
                                                            <button className="btn btn-danger ml-2" name="rejected" onClick={(e) => props.handleApplicatonStatus(e, application._id)}>Reject</button>
                                                        </>
                                                        : <button
                                                            style={{ width: '100px' }}
                                                            className={`btn ${application.status === 'rejected' ? 'btn-danger' : 'btn-success'}`}>
                                                            {application.status}
                                                        </button>
                                                }
                                            </td>
                                        </tr>
                                    
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
