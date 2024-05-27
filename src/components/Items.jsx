import React, { useEffect, useState } from 'react'
import db from '../appwrite/Databases'

function Items() {
  const [itemsDetails, setItemsDetails] = useState([]);
  const [data, setData] = useState(
    {
      item_name: '',
      item_rate: '',
    }
  );

  const [upData, setUpData] = useState(

    {
      item_name: '',
      item_rate: '',
    },

  );

  const [id, setId] = useState();

  useEffect(() => {
    init();
  }, []);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value })
  };

  const handleUpData = (event, property) => {
    setUpData({ ...upData, [property]: event.target.value })


  };

  const handleAdd = async (e) => {
    e.preventDefault();
    e.target.reset();
    console.log('submitted form');
    const handleUpData = () => {

    }

    try {
      const payload = data
      const response = await db.item.create(payload)
      setItemsDetails((prev) => [response, ...prev]);
      
      setData(
        {
          item_name: '',
          item_rate: '',
        },
      )
    } catch (error) {
      console.error('error');
    }


  };

  const handleUpdate = async(e) => {
    e.preventDefault();
    e.target.reset();
    if (upData.item_name === ''|| upData.item_rate==='') return;
    try {
      const payload = upData;
      const response = await db.item.update(id,payload)
      setItemsDetails((prev)=>prev.map((member)=>(member.$id===id?upData:member)));
      setUpData(
        {
          item_name: '',
          item_rate: '',
        },
    
      )
    } catch (error) { 
      console.error('error');
      
    }

  };
  const handleDelete = async(id)=>{
  await db.item.delete(id);
   setItemsDetails((prev)=> prev.filter((member)=>member.$id!==id))
  }; 
  // useEffect(()=>{
  //   console.log(data);
  // },[data])
  const init = async () => {
    const response = await db.item.list();
    setItemsDetails(response.documents);
  }

  return (
    <div>
      <div className="body-employe">
        <div className="body-employe-container">
          <div className="body-employe-container-header">
            <div className="row">
              <div className="col-6 ">
                <span className="fs-3 ">Item Details</span>
              </div>
              <div className="col-6 text-end">
                <button
                  type="button"
                  className="btn "
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <ion-icon name="add-circle" /> Add Item
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
                    <th scope="col">Item</th>
                    <th scope="col">Per Day Rate</th>
                    <th scope="col">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    itemsDetails.map((details, idx) => {

                      return (
                        <tr key={details.$id}>
                          <td scope="row">{idx + 1}</td>
                          <td>{details.item_name}</td>
                          <td>{details.item_rate}</td>
                          <td className="text-end ">
                            <button className="btn btn-sm btn-warning mx-3"
                            onClick={() => setId(details.$id)}
                              data-bs-toggle="modal"
                              data-bs-target="#myModal2">
                              <ion-icon name="create" />
                            </button>
                            <button className="btn btn-sm btn-danger"onClick={() => handleDelete(details.$id)}
                            >
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
        className="modal  modal-lg   "
        id="myModal"
        role="dialog"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Create New Item</h4>
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
                        Item Name*
                      </label>
                      <input
                        type="text"
                        onChange={(e) => handleChange(e, 'item_name')}
                        className="form-control shadow-lg"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="mb-3">
                      <label htmlFor="input-name" className="form-label">
                        Per Day Rate
                      </label>
                      <input
                        type="number"
                        className="form-control shadow-lg"
                        onChange={(e) => handleChange(e, 'item_rate')}
                        placeholder="Enter Rate"
                      />
                    </div>
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

      {/* modal start 2 */}

      <div
        className="modal  modal-lg   "
        id="myModal2"
        role="dialog"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Item</h4>
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
                        Item Name*
                      </label>
                      <input
                        type="text"
                        onChange={(e) => handleUpData(e, 'item_name')}
                        className="form-control shadow-lg"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="mb-3">
                      <label htmlFor="input-name" className="form-label">
                        Per Day Rate
                      </label>
                      <input
                        type="number"
                        onChange={(e) => handleUpData(e, 'item_rate')}
                        className="form-control shadow-lg"
                        placeholder="Enter Rate"
                      />
                    </div>
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


    </div >
  )
}

export default Items
