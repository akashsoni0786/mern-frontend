import Axios from 'axios';
import "./payment.css";

function Payment() {

  const loadScript = () => {
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    })
  }

  const displayRazorpay = async() =>{
    await loadScript();
    const resp = await Axios.post('http://localhost:3000/checkout', {method: 'post',
      // data : {
      //   id:"9879878787",amount:3000,currency:"INR"
      // }
    });
    console.log(resp.data); 
    const {id, amount, currency } = resp.data.data;
    console.log(amount);
    let options = {
        "key": 'rzp_test_RRv9RrX1Y1mqqZ', // Enter the Key ID generated from the Dashboard
        "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": currency,
        "name": "AKASH SONI Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
          console.log("response ",response)
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
        },
        "prefill": {
            "name": "Akash Soni",
            "email": "aakashkumarsoni0786@gmail.com",
            "contact": "7275022124"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var razorpayInst = new Razorpay(options);

    razorpayInst.open();


  }



  return (
    <>
      <button className="cart-net-total-paybtn" onClick={displayRazorpay}>
        Proceed to Pay
      </button>
    </>
  );
}

export default Payment