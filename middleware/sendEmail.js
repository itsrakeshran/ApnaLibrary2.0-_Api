import nodemailer from 'nodemailer'

    let transporter = nodemailer.createTransport({
      service: 'gmail', // use 'gmail' or any other service you prefer
      secure:true,
      port:465,
      auth: {
        user: 'rakeshran750@gmail.com', // replace with your email
        pass: 'cinzqbkmopzgzsmh' // replace with your password
      }
    });



let htmlmsg=`
        <!DOCTYPE html>s
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Created Successfully</title>
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                #card {
                    background-color: #f0f0f0;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    margin: 0 auto;
                }
                #checkmark {
                    fill: #4CAF50;
                    width: 50px;
                    height: 50px;
                }
                #status {
                    color: #4CAF50;
                }
                #message {
                    font-size: 16px;
                    margin-top: 10px;
                }
                #contBtn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div id="card">
                <div id="upper-side">
                    <!-- SVG checkmark icon -->
                    <svg version="1.1" id="checkmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
                        <path d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65 c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382 c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209 c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091 c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027 c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865 C131.967,94.755,132.296,93.271,131.583,92.152z" />
                        <circle fill="none" stroke="#ffffff" stroke-width="5" stroke-miterlimit="10" cx="109.486" cy="104.353" r="32.53" />
                    </svg>
                    <h3 id="status">Success</h3>
                </div>
                <div id="lower-side">
                    <p id="message">Congratulations, your account has been successfully created.</p>
                    <a href="http://localhost:5173/" id="contBtn">SignUp</a>
                    <a href="http://localhost:5173/">Click here to go </a>
                </div>
            </div>
        </body>
        </html>
`

const sendEmail=(req,res,next)=>{

    let mailOptions = {
        from: 'rakeshran750@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Apna Library Id', // Subject line
        text: `Hello ${req.body.nam} your Account has been created`, // plain text body
        html: htmlmsg // html body
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return next(err);
        }
        // console.log('Message sent: %s', info.messageId);
        next();
      });
}

export default sendEmail;