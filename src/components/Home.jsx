import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const deleteContact = (id) => {
    dispatch({ type:"DELETE_CONTACT", payload:id });
    console.log("Hello");
    toast.success("Contact Deleted Successfully..!!");
    //navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-3 d-grid d-md-flex justify-content-md-end">
          <Link to="/add" className="btn btn-outline-primary">
            Add Contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table">
            <thead className="text-center text-white table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">CONATCT NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">MOBILE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {contacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.mobile}</td>
                  <td className="d-flex flex-row gap-3 align-items-center justify-content-center">
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-small btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="btn btn-small btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
