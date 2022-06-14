import { useState } from "react";
import axios from "axios";
import Overlay from "./components/Overlay";
import Modal from "./components/Modal";
import data from "./data/callbackurl.json";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    amount: "",
    number: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const makeMpesaRequest = async (e) => {
    e.preventDefault();
    if (!payment.number && !payment.amount) {
      setError("These two fileds cannot be empty");
      return;
    }
    setShowModal(true);
    await axios
      .post(
        "/api/v2/stkpush_request",
        {
          number: payment.number,
          amount: payment.amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.CustomerMessage) {
          setMessage(response.data.CustomerMessage);
        } else {
          setMessage(response.data.errorMessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setShowModal(true);
    setTimeout(() => {
      let lastPayment = data.slice(-1);
      if (lastPayment.CallBackURLData.ResultCode === 0) {
        setShowModal(false);
        navigate("/success");
      } else {
        setShowModal(false);
        navigate("/cancel");
      }
    }, 2000);
  };

  return (
    <div className="background">
      <div className="main_container">
        <div className="options">
          <span>Mpesa</span>
          <span>PayPal</span>
          <span>Card</span>
        </div>
        <div className="image_text">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/03/M-pesa-logo.png"
            alt="mpesa"
          />
          <p>Enter Amount and Number</p>
        </div>
        <div className="form_inputs">
          <form className="form" onSubmit={makeMpesaRequest}>
            <div className="input">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="07xx-xxx-xxx"
                value={payment.number}
                name="number"
                onChange={(e) =>
                  setPayment({ ...payment, number: e.target.value })
                }
              />
            </div>
            <div className="input">
              <label>Amount</label>
              <input
                type="text"
                value={payment.amount}
                placeholder="Amount"
                name="amount"
                onChange={(e) =>
                  setPayment({ ...payment, amount: e.target.value })
                }
              />
            </div>
            <p className="error">{error}</p>
            <div className="actions">
              <button type="submit">Donate</button>
            </div>
          </form>
        </div>
        {showModal && <Overlay />}
        {showModal && <Modal text={message} />}
      </div>
    </div>
  );
}

export default App;
