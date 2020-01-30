import React, { Component } from 'react'
import axios from '../config/config'
import DetailsModal from './DetailsModal'
import Table from './Table'

export class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedJobTitle: 'Front-End Developer',
            modalShow: false,
            isModalLoading: true,
            jobApplications: [],
            showApplications: [],
            showApplicationDetails: {}
        }
    }
    componentDidMount = () => {
        axios.get('/users/application-forms')
            .then(res => {
                console.log(res.data)
                const jobApplications = res.data
                this.setState(prevState => (
                    { jobApplications, showApplications: jobApplications.filter(application => application.jobTitle === prevState.selectedJobTitle) }
                ))
            })
            .catch(err => {
                alert(err)
            })
    }

    handleViewDetails = (appId) => {
        axios.get(`/users/application-form/${appId}`)
            .then(res => {
                console.log(res.data)
                this.setState({ modalShow: true, showApplicationDetails: res.data, isModalLoading: false })
            })
            .catch(err => {
                alert(err)
            })
    }
    handleApplicatonStatus = (e, appId) => {
        console.log("handleApplicationStatus " + appId + " " + e.target.name)
        axios.put(`/users/application-form/update/${appId}`, { status: e.target.name })
            .then(res => {
                console.log(res.data)
                axios.get('/users/application-forms')
                    .then(res => {
                        console.log(res.data)
                        const jobApplications = res.data
                        this.setState(prevState => (
                            { jobApplications, showApplications: jobApplications.filter(application => application.jobTitle === prevState.selectedJobTitle) }
                        ))
                    })
                    .catch(err => {
                        alert(err)
                    })
            })
            .catch(err => {
                alert(err)
            })

    }
    setModalShow = (modalShow) => {
        this.setState({ modalShow })
    }
    handleSelectView = (e) => {
        const selectedJobTitle = e.target.name
        this.setState({ selectedJobTitle }, () => {
            this.setState(prevState => {
                const showApplications = prevState.jobApplications.filter(application => application.jobTitle === prevState.selectedJobTitle)
                return { showApplications }
            }, () => {
                console.log(this.state.showApplications)
            })
        })
    }

    render() {
        const { selectedJobTitle, showApplicationDetails, modalShow, isModalLoading } = this.state
        return (
            <div>
                <nav className="nav nav-pills nav-fill mt-5">
                    <button className={`${selectedJobTitle === 'Front-End Developer' ? 'btn btn-primary' : 'btn btn-light'}  pl-3 pr-3 mr-3 mb-2`} name="Front-End Developer" onClick={this.handleSelectView}>Front-End Developer</button>
                    <button className={`${selectedJobTitle === 'Node.js Developer' ? 'btn btn-primary' : 'btn btn-light'}  pl-3 pr-3 mr-3 mb-2`} name="Node.js Developer" onClick={this.handleSelectView}>Node.js Developer</button>
                    <button className={`${selectedJobTitle === 'MEAN Stack Developer' ? 'btn btn-primary' : 'btn btn-light'}  pl-3 pr-3 mr-3 mb-2`} name="MEAN Stack Developer" onClick={this.handleSelectView}>MEAN Stack Developer</button>
                    <button className={`${selectedJobTitle === 'FULL Stack Developer' ? 'btn btn-primary' : 'btn btn-light'}  pl-3 pr-3 mr-3 mb-2`} name="FULL Stack Developer" onClick={this.handleSelectView}>FULL Stack Developer</button>
                </nav>
                <div className="mt-5">
                    <Table showApplications={this.state.showApplications} handleApplicatonStatus={this.handleApplicatonStatus} handleViewDetails={this.handleViewDetails} />
                        <DetailsModal
                            isModalLoading={isModalLoading}
                            showApplicationDetails={showApplicationDetails}
                            show={modalShow}
                            onHide={() => this.setModalShow(false)}
                        />
                    
                </div>
            </div>
        )
    }
}

export default Admin
