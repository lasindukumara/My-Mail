// Import required modules
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

// Define the port the server will run on
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Email Sender Project!");
});

// Email sending route with custom template
app.post("/send-email", async (req, res) => {
  const { to, subject, name, customMessage } = req.body;

  if (!to || !subject || !name || !customMessage) {
    return res
      .status(400)
      .json({ message: "To, subject, name, and customMessage are required!" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Lasindukumara2020@gmail.com", // Replace with your Gmail address
        pass: "qtkecpvnscgdwuhp", // Replace with your Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define the HTML template
    const emailTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                background-color: #f9f9f9;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                background: #fff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                padding-bottom: 20px;
                            }
                            .header h1 {
                                color: #007BFF;
                            }
                            .header img {
                                max-width: 100px;
                                border-radius: 50%;
                                margin-bottom: 20px;
                            }
                            .content {
                                font-size: 16px;
                                line-height: 1.5;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                font-size: 12px;
                                color: #aaa;
                            }
                            .signature {
                                text-align: left;
                                margin-top: 20px;
                            }
                            .signature img {
                            width: 20%;
                                max-width: 200px;
                                margin-top: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <img src="https://drive.usercontent.google.com/download?id=1dL1r_M4xAt7xychPdnYb8JJPx34FHEZJ&export=view&authuser=0" alt="Your Picture">
                                <h1>Hello, ${name}!</h1>
                                <h4>Subject: ${subject}</h4>
                            </div>
                            <div class="content">
                                <p>${customMessage}</p>
                                
                                <p>Thank you for using our service.</p>
                            </div>
                            <div class="signature">
                             <img src="https://drive.usercontent.google.com/download?id=1qh3H15oa6BxnaXtFlMvooD4om0B_rjza" alt="Your Signature">
                                <p>Lasindu Kumara <br>
                                Undergraduate at University of Colombo <br>
                                Student of Chartered Institutes of Sri Lanka</p>
                               
                            </div>
                            <div class="footer">
                                <p>&copy; 2025 A.H.K.Lasindu Kumara. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;

    // Define email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to: to,
      subject: subject,
      html: emailTemplate,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    res.json({
      message: "Email sent successfully!",
      info: info,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

// 404 Route (matches undefined routes)
app.use((req, res) => {
  res.status(404).send("Sorry, the page you are looking for does not exist!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
