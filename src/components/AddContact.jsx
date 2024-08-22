import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, Slide, toast } from "react-toastify";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(contacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    const checkMobile = contacts.find(
        (contact) => contact.mobile === mobile && mobile
    );
    console.log(checkEmail);
    
    if (!email || !name || !mobile) {
      return toast.warning("Please fill in all fields!!", {transition: Slide, autoClose: 2000});
    }
    
    if(checkEmail) {
        return toast.error("This Email Already Exist!!");
    }

    if(checkMobile) {
        return toast.error("This Mobile Number Already Exist");
    }

    if(mobile.length !== 10) {
        return toast.error("Invalid Mobile Number");
    }
    const date = new Date();
    const time = date.getTime();
    const data = {
        id: time,
        name,
        email,
        mobile,
    }
    dispatch({type: "ADD_CONTACT", payload: data});
    toast.success("Contact Added Successfully..!!");
    navigate("/");
  };

  return (
    <div className="container my-5">
      <div className="row">
        <h2 className="text-center text-dark">Add Contact</h2>
        <div className="col-md-6 rounded-3 bg-light bg-gradient text-dark shadow-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="form-group d-flex flex-column gap-3 m-5 justify-content-center">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control shadow-none"
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control shadow-none"
              />
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control shadow-none"
              />
              <button className="form -control btn btn-outline-danger fs-5 fw-bold px-4">
                ADD CONTACT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
