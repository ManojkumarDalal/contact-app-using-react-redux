const initialState = [
  {
    id: 1,
    name: "Manojkumar Dalal",
    email: "rajhansmanoj77@gmail.com",
    mobile: "8308341531",
  },
  {
    id: 2,
    name: "Varad Dalal",
    email: "varaddalal25@gmail.com",
    mobile: "9011403125",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "DELETE_CONTACT":
      const filterContact = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = filterContact;
      return state;
    default:
      return state;
  }
};
export default contactReducer;
