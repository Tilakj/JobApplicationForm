

import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function DetailsModal(props) {
  const {showApplicationDetails,isModalLoading} = props
  console.log(props)
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {`${showApplicationDetails.name} Profile`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          isModalLoading ? <p> Loading... </p> : (
            <table>
              <tbody>
                <tr>
                  <td style={{ 'width': '35%' }}> <strong>Name:</strong> </td>
                  <td>  {showApplicationDetails.name}  </td>
                </tr>

                <tr>
                  <td> <strong>Email: </strong> </td>
                  <td> {showApplicationDetails.email}  </td>
                </tr>

                <tr>
                  <td> <strong>Experience: </strong> </td>
                  <td> {showApplicationDetails.experience} </td>
                </tr>

                <tr>
                  <td> <strong>Skills: </strong> </td>
                  <td> {showApplicationDetails.skills} </td>
                </tr>

                <tr>
                  <td> <strong> Status: </strong> </td>
                  <td> {showApplicationDetails.status} </td>
                </tr>
              </tbody>
            </table>
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// // import React from 'react'

// // export default function Modal(props) {
// //     console.log(props)
// //     return (
// //         <div className="modal" id="exampleModalLong" tabindex="-1" role="dialog">
// //             <div className="modal-dialog" role="document">
// //                 <div className="modal-content">
// //                     <div className="modal-header">
// //                         <h5 className="modal-title">Modal title</h5>
// //                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
// //                             <span aria-hidden="true">&times;</span>
// //                         </button>
// //                     </div>
// //                     <div className="modal-body">
// //                         <p>Modal body text goes here.</p>
// //                     </div>
// //                     <div className="modal-footer">
// //                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>

// //     )
// // }

// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';

// class DetailsModal extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       candidate: {},
//       isLoading: true
//     }
//   }

//   componentDidMount() { 
//     const url = `https://cors-anywhere.herokuapp.com/http://dct-application-form.herokuapp.com/users/application-form/${this.props.id}`
//     axios.get(url)
//       .then((response) => {
//         console.log(response.data)
//         const candidate = response.data;
//         this.setState({ candidate, isLoading: false });
//       })
//       .catch((err) => {
//         this.setState({isLoading: true })
//         alert(err)
//       });
//   }

//   render() {
//     const { candidate, isLoading } = this.state;
//     return (
//       <Modal
//         {...this.props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             {candidate.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {
//             isLoading ? <p> Loading... </p> : (
//               <table>
//                 <tbody>
//                 <tr>
//                   <td style={{ 'width': '35%' }}> <strong>Name:</strong> </td>
//                   <td> {candidate.name}  </td>
//                 </tr>

//                 <tr>
//                   <td> <strong>Email: </strong> </td>
//                   <td> {candidate.email}  </td>
//                 </tr>

//                 <tr>
//                   <td> <strong>Experience: </strong> </td>
//                   <td> {candidate.experience} </td>
//                 </tr>

//                 <tr>
//                   <td> <strong>Skills: </strong> </td>
//                   <td> {candidate.skills} </td>
//                 </tr>

//                 <tr>
//                   <td> <strong> Status: </strong> </td>
//                   <td> {candidate.status} </td>
//                 </tr>
//                 </tbody> 
//               </table>
//             )
//           }

//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={this.props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     )
//   }

// }

// export default DetailsModal;


// // import React, { Component } from 'react'
// // import axios from '../config/config'
// // export className Modal extends Component {
// //     constructor(props) {
// //         super(props)

// //         this.state = {
// //              user:{}

// //         }
// //     }
// //     componentDidMount=()=>{
// //         axios.get(`/users/application-form/${this.props.appId}`)
// //         .then(res => {
// //             console.log(res.data)

// //         })
// //         .catch(err => {
// //             alert(err)
// //         })
// //     }

// //     render() {
// //         return (
// //             <div className="modal" id="exampleModalLong" tabindex="-1" role="dialog">
// //                 <div className="modal-dialog" role="document">
// //                     <div className="modal-content">
// //                         <div className="modal-header">
// //                             <h5 className="modal-title">Modal title</h5>
// //                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
// //                                 <span aria-hidden="true">&times;</span>
// //                             </button>
// //                         </div>
// //                         <div className="modal-body">
// //                             <p>Modal body text goes here.</p>
// //                         </div>
// //                         <div className="modal-footer">
// //                             <button type="button" className="btn btn-primary">Save changes</button>
// //                             <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         )
// //     }
// // }

// // export default Modal
