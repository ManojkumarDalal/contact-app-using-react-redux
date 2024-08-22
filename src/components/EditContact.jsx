import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const contacts = useSelector((state) => state);
  const currentContact = contacts.find((contact) => contact.id === parseInt(id));
 

  useEffect(() => {
    if(currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setMobile(currentContact.mobile);
    }
  }, [currentContact]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email && email
    );

    const checkMobile = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.mobile === mobile && mobile
    );
    console.log(checkEmail);

    if (!email || !name || !mobile) {
      return toast.warning("Please fill in all fields!!", {
        transition: Slide,
        autoClose: 2000,
      });
    }

    if (checkEmail) {
      return toast.error("This Email Already Exist!!");
    }

    if (checkMobile) {
      return toast.error("This Mobile Number Already Exist");
    }

    if (mobile.length !== 10) {
      return toast.error("Invalid Mobile Number");
    }
    const contact = {
      id: parseInt(id),
      name,
      email,
      mobile,
    };
    console.log(contact);
    dispatch({ type: "UPDATE_CONTACT", payload: contact });
    toast.success("Contact Updated Successfully..!!");
    navigate("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <div className="row">
          <h1 className="display-8 text-center text-dark mt-4">Edit Contact</h1>
          <div className="col-md-6 rounded-3 bg-light bg-gradient text-dark shadow-lg mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group d-flex flex-column gap-3 m-5 justify-content-center">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control shadow-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control shadow-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="form-control shadow-none"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <div className="form-group text-end">
                  <button className="form -control btn btn-outline-primary fs-6 px-3 mx-2">
                    Update
                  </button>
                  <Link to="/" className="btn btn-outline-danger ml-2 px-3">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1 className="text-danger fs-1 fw-bold text-center">
          This contact id: {id} is not exist
        </h1>
      )}
    </div>
  );
};

export default EditContact;
