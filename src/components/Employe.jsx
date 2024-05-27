import React, { useEffect, useState } from 'react'
import '../App.css'
import conf from '../conf/conf'

import db from '../appwrite/Databases'

function Employe() {
  const [employeName, setEmployeName] = useState([]);
  const [data, setData] = useState(
    {
      employe_name: '',
      employe_phone: null,
      employe_type: '',
      employe_amount: null,


    }
  )
  const [updata, setUpData] = useState(
    {
      employe_name: '',
      employe_phone: null,
      employe_type: '',
      employe_amount: null,


    }
  )
  const [id, setId] = useState();

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value })


  }
  const handleUpChange = (event, property) => {
    setUpData({ ...updata, [property]: event.target.value })


  }




  useEffect(() => {
    init();
  }, [])



  // useEffect(() => {
  //   console.log(data);
  //   console.log(updata);
  // }, [data,updata])

  const init = async () => {
    const response = await db.employe.list();
    setEmployeName(response.documents);


  }
  const handleAdd = async (e) => {
    e.preventDefault()
    console.log('click');
    e.target.reset()
    data.employe_amount = parseInt(data.employe_amount)
    if (data.employe_name === '') return;
    try {
      const payload = data
      const response = await db.employe.create(payload)
      setEmployeName((prev) => [response, ...prev])
      setData({
        employe_name: '',
        employe_phone: '',
        employe_type: '',
        employe_amount: '',

      })
    } catch (error) {
      console.error(error);
    }

  }


  const handleUpdate = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (updata.employe_name === '') return;
    updata.employe_amount = parseInt(updata.employe_amount);
    console.log('update');
    try {
      const payload = updata;
      const response = await db.employe.update(id, payload);
      setEmployeName((prev) => prev.map((member) => (member.$id === id ? updata : member)));
      setUpData({
        employe_name: '',
        employe_phone: '',
        employe_type: '',
        employe_amount: '',
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handledelete = async (id) => {
    console.log(id);

   await db.employe.delete(id);
   
    setEmployeName((prev) => prev.filter((i) => i.$id !== id))


  };




  return (

    <div>

      <div className="body-employe">
        <div className="body-employe-container">
          <div className="body-employe-container-header">
            <div className="row">
              <div className="col-6 ">
                <span className="fs-3 ">Employe Details</span>
              </div>
              <div className="col-6 text-end">
                <button
                  type="button"
                  className="btn "
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <ion-icon name="add-circle" /> Add Employe
                </button>
              </div>
            </div>
          </div>
          <div className="body-employe-container-search">
            <input type="text" placeholder="Search" />
            <button className="btn">Reset</button>
          </div>
          <div className="body-employe-container-table">
            <div>
              <table className="table  inner-table table-responsive  ">
                <thead cellPadding={0} cellSpacing={0} className="table-head">
                  <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Type</th>
                    <th className="t-last" scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    employeName.map((details, idx) => {

                      return (
                        <tr key={details.$id}>
                          <td scope="row">{idx + 1}</td>
                          <td>{details.employe_name}</td>
                          <td>{details.employe_phone}</td>
                          <td>{details.employe_type}</td>

                          <td className="text-end ">
                            <button className="btn btn-sm btn-warning mx-3"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal2"
                              onClick={() => setId(details.$id)}>
                              <ion-icon name="create" />
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handledelete(details.$id)}>
                              <ion-icon name="close" />
                            </button>
                          </td>

                        </tr>

                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal start  */}
      <div
        className="modal fade modal-lg   "
        id="myModal"
        role="dialog"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Create New Employe</h4>
              <button type="button" className="btn close" data-bs-dismiss="modal">
                <ion-icon name="close" />
              </button>
            </div>
            <div className="modal-body">

              <form onSubmit={handleAdd}>


                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="input-name" className="form-label">
                        Employe Name*
                      </label>
                      <input
                        type="text"
                        name='employe_name'
                        className="form-control shadow-lg"
                        placeholder="Enter Name"
                        onChange={(e) => handleChange(e, 'employe_name')}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="mb-3">
                      <label htmlFor="input-name" className="form-label">
                        Phone No.
                      </label>
                      <input
                        type="number"
                        name='employe_number'
                        className="form-control shadow-lg"
                        placeholder="Enter number"
                        onChange={(e) => handleChange(e, 'employe_phone')}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">Employe Type*</label>
                    <select className="form-select"
                      name='employe_type' onChange={(e) => handleChange(e, 'employe_type')}>
                      <option >Type of Employe</option>
                      <option value='daily'>Daily</option>
                      <option value='hourly'>Hourly</option>
                    </select>
                  </div>
                  <div className="col-6 ">
                    <label htmlFor="input-name" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      name='employe_amount'
                      className="form-control shadow-lg"
                      placeholder="Enter Amount"
                      onChange={(e) => handleChange(e, 'employe_amount')}
                    />
                  </div>
                </div>


                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    data-bs-dismiss="modal"
                    style={{ background: "#6D31EDFF", color: "#ebebeb" }}

                  >
                    Submit
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      </div>
      {/* modal end  */}

      {/* modal 2 start */}
      <div
        className="modal fade modal-lg   "
        id="myModal2"
        role="dialog"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Employe</h4>
              <button type="button" className="btn close" data-bs-dismiss="modal">
                <ion-icon name="close" />
              </button>
            </div>
            <div className="modal-body">

              <form onSubmit={handleUpdate}>


                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="input-name" className="form-label">
                        Employe Name*
                      </label>
                      <input
                        type="text"
                        name='employe_name'
                        className="form-control shadow-lg"
                        placeholder="Enter Name"
                        onChange={(e) => handleUpChange(e, 'employe_name')}


                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="mb-3">
                      <label htmlFor="input-name" className="form-label">
                        Phone No.
                      </label>
                      <input
                        type="number"
                        name='employe_number'
                        className="form-control shadow-lg"
                        placeholder="Enter number"
                        onChange={(e) => handleUpChange(e, 'employe_phone')}

                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">Employe Type*</label>
                    <select className="form-select"
                      name='employe_type' onChange={(e) => handleUpChange(e, 'employe_type')} >
                      <option >Type of Employe</option>
                      <option value='daily'>Daily</option>
                      <option value='hourly'>Hourly</option>
                    </select>
                  </div>
                  <div className="col-6 ">
                    <label htmlFor="input-name" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      name='employe_amount'
                      className="form-control shadow-lg"
                      placeholder="Enter Amount"
                      onChange={(e) => handleUpChange(e, 'employe_amount')}
                    />
                  </div>
                </div>


                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    data-bs-dismiss="modal"



                    style={{ background: "#6D31EDFF", color: "#ebebeb" }}

                  >
                    Update
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      </div>





      {/* modal 2 end  */}




    </div >
  )
}

export default Employe
