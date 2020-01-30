import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import axios from "../config/config";

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    contact: Yup.number()
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .typeError("That doesn't look like a phone number")
        .required('A phone number is required'),
    applyingFor: Yup.string()
        .required('Required'),
    experience: Yup.string()
        .required('Required'),
    technicalSkill: Yup.string()

})

class JobForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            form: {
                fullName: '',
                email: '',
                contact: '',
                applyingFor: '',
                experience: '',
                technicalSkill: ''
            },
            jobs: [
                { jobId: 1, name: 'Front-End Developer' },
                { jobId: 2, name: 'Node.js Developer' },
                { jobId: 3, name: 'MEAN Stack Developer' },
                { jobId: 4, name: 'FULL Stack Developer' },],
            serverErrors: {}
        }
    }


    render() {
        const { serverErrors } = this.state
        return (
            <div className="container mt-3 mb-5">
                <div className="row mb-2">
                    <div className="col-lg-12 text-center">
                        <h2 className="mt-3">Apply for job</h2>
                    </div>
                </div>
                <div className="row p-3 card">
                    <div className="col-lg-12">
                        <Formik
                            initialValues={this.state.form}
                            validationSchema={validationSchema}

                            onSubmit={(values, actions, reset) => {
                                const formData = {
                                    name: values.fullName,
                                    email: values.email,
                                    phone: values.contact,
                                    skills: values.technicalSkill,
                                    jobTitle: values.applyingFor,
                                    experience: values.experience
                                }
                                this.setState({ serverErrors: {} })
                                axios.post('/users/application-form', formData)
                                    .then(res => {
                                        if (res.data.errors) {
                                            this.setState({ serverErrors: res.data.errors }, () => {
                                                console.log("updated successfully" + this.state.serverErrors)
                                            })
                                        }
                                        actions.setSubmitting(false);
                                    })
                                    .catch(err => {
                                        actions.setSubmitting(false);
                                    })
                                this.props.submitForm(formData)
                                console.log(JSON.stringify(this.state.form))


                            }}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <Field
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter full name"
                                            className={`form-control ${
                                                touched.fullName && errors.fullName ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="fullName"
                                            className="invalid-feedback"
                                        />
                                        {this.state.serverErrors.name && <div className="invalid-feedback">{serverErrors.name.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            className={`form-control ${
                                                touched.email && errors.email ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="email"
                                            className="invalid-feedback"
                                        />
                                        {this.state.serverErrors.email && <div className="invalid-feedback">{serverErrors.email.message}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contact">Contact Number</label>
                                        <Field
                                            type="text"
                                            name="contact"
                                            placeholder="Enter contact number"
                                            className={`form-control ${
                                                touched.contact && errors.contact ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="contact"
                                            className="invalid-feedback"
                                        />
                                        {this.state.serverErrors.phone && <div className="invalid-feedback">{serverErrors.phone.message}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="experience">Experience</label>
                                        <Field
                                            type="text"
                                            name="experience"
                                            placeholder="Experience (2 years, 3months)"
                                            className={`form-control ${
                                                touched.experience && errors.experience ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="experience"
                                            className="invalid-feedback"
                                        />
                                        {this.state.serverErrors.experience && <div className="invalid-feedback">{serverErrors.experience.message}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="applyingFor">Applying for job</label>
                                        <Field name="applyingFor" as="select" className="form-control" >
                                            <option>----Select----</option>
                                            {
                                                this.state.jobs.map(job => {
                                                    return <option key={job.jobId} value={job.name}>{job.name}</option>
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage
                                            component="div"
                                            name="applyingFor"
                                            className="invalid-feedback"
                                        />
                                        {this.state.serverErrors.jobTitle && <div className="invalid-feedback">{serverErrors.jobTitle.message}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="technicalSkill">Technical Skills</label>
                                        <Field
                                            component="textarea"
                                            name="technicalSkill"
                                            placeholder="Technical Skills"
                                            className={`form-control ${
                                                (touched.technicalSkill && errors.technicalSkill) || this.state.serverErrors.skills ? "is-invalid" : ""
                                                } `}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="technicalSkill"
                                            className="invalid-feedback"
                                        />
                                        {this.state.serverErrors.skills && <p className="mt-2" style={{ color: 'red' }}>{serverErrors.skills.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isSubmitting ||
                                            (touched.email && errors.email) ||
                                            (touched.fullName && errors.fullName) ||
                                            (touched.contact && errors.contact) ||
                                            (touched.applyingFor && errors.applyingFor) ||
                                            (touched.experience && errors.experience) ||
                                            (touched.technicalSkill && errors.technicalSkill)}
                                    >
                                        {isSubmitting ? "Please wait..." : "Send Application"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
        );
    }
}

export default JobForm

        // import React from 'react';
// import {useFormik} from 'formik';
                // import * as Yup from 'yup';

// const JobForm = () => {
//     const formik = useFormik({
//         initialValues: {
//             firstName: '',
//             lastName: '',
//             email: '',
//         },
//         validationSchema: Yup.object({
//             firstName: Yup.string()
//                 .max(15, 'Must be 15 characters or less')
//                 .required('Required'),
//             lastName: Yup.string()
//                 .max(20, 'Must be 20 characters or less')
//                 .required('Required'),
//             email: Yup.string()
//                 .email('Invalid email address')
//                 .required('Required'),
//         }),
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });
//     return (
//         <form className="needs-validation" novalidate onSubmit={formik.handleSubmit}>
//             <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.firstName}
//                 />
//                 {formik.touched.firstName && formik.errors.firstName ? (
//                     <div className="invalid-feedback">{formik.errors.firstName}</div>
//                 ) : null}
//             </div>
//             <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.lastName}
//                 />
//                 {formik.touched.lastName && formik.errors.lastName && <div className="invalid-feedback">{formik.errors.lastName}</div>}

//             </div>
//             <div className="form-group">
//                 <label htmlFor="email">Email Address</label>
//                 <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.email}
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                     <div>{formik.errors.email}</div>
//                 ) : null}
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default JobForm



// // import React from 'react';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';

// // const JobForm = () => {
// //     const formik = useFormik({
// //         initialValues: {
// //             fullName: '',
// //             email: '',
// //             contact: '',
// //             applyingFor: '',
// //             experience: '',
// //             technicalSkill: ''
// //         },
// //         validationSchema: Yup.object({
// //             firstName: Yup.string()
// //                 .max(15, 'Must be 15 characters or less')
// //                 .required('Required'),
// //             contact: Yup.number()
// //                 .typeError("That doesn't look like a phone number")
// //                 .positive("A phone number can't start with a minus")
// //                 .integer("A phone number can't include a decimal point")
// //                 .min(10, 'Phone number is not valid')
// //                 // .max(10, 'Phone number is not valid')
// //                 .required('A phone number is required'),
// //             email: Yup.string()
// //                 .email('Invalid email address')
// //                 .required('Required'),
// //             applyingFor: Yup.string()
// //                 .required('Required'),
// //             experience: Yup.string()
// //                 .required('Required'),
// //             technicalSkill: Yup.string()

// //         }),
// //         onSubmit: values => {
// //             alert(JSON.stringify(values, null, 2));
// //         },
// //     });
// //     return (
// //         <form onSubmit={formik.handleSubmit}>
// //             <label htmlFor="fullName">Full Name</label>
// //             <input
// //                 id="fullName"
// //                 name="fullName"
// //                 type="text"
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 value={formik.values.fullName}
// //             />
// //             {formik.touched.fullName && formik.errors.fullName ? (
// //                 <div className="invalid-feedback">{formik.errors.fullName}</div>
// //             ) : null}
// //             <label htmlFor="email">Email</label>
// //             <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 value={formik.values.email}
// //             />
// //             {formik.touched.email && formik.errors.email ? (
// //                 <div className="invalid-feedback">{formik.errors.email}</div>
// //             ) : null}
// //             <label htmlFor="contact">Contact</label>
// //             <input
// //                 id="contact"
// //                 name="contact"
// //                 type="text"
// //                 onChange={formik.handleChange}
// //                 onBlur={formik.handleBlur}
// //                 value={formik.values.contact}
// //             />
// //             {formik.touched.contact && formik.errors.contact ? (
// //                 <div className="invalid-feedback">{formik.errors.contact}</div>
// //             ) : null}

// //             <button type="submit">Submit</button>
// //         </form>
// //     );
// // };

// // export default JobForm