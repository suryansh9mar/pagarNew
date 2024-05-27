import React from 'react'

function Attendance() {
  return (
    <div>
      <div className="body-employe">
  <div className="body-employe-container">
    <div className="body-employe-container-header">
      <div className="row">
        <div className="col-6 ">
          <span className="fs-3 ">Attendence Details</span>
        </div>
        <div className="col-6 ">
          <label htmlFor="attendanceDate" className="form-label">
            Date
          </label>
          <input type="date" className="form-control " id="attendanceDate" />
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
            <tr>
              <td scope="row">1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td className="text-end ">
                <button className="btn btn-sm btn-warning">
                  <ion-icon name="create" />
                </button>
                <button className="btn btn-sm btn-danger">
                  <ion-icon name="close" />
                </button>
              </td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td className="text-end ">
                <button className="btn btn-sm  btn-warning">
                  <ion-icon name="create" />
                </button>
                <button className="btn btn-sm  btn-danger">
                  <ion-icon name="close" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Attendance
