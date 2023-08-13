const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
// app.use(cors());
app.use(cors({
    origin: 'https://mari-miyazaki.netlify.app',
    methods: ['GET', 'POST'],
  }));
app.use(express.json());
app.use('/', router);
app.listen('https://my-portfolio-server-guln.onrender.com', () => console.log('Server Running!'));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mari.myzk98@gmail.com',
    pass: ''
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready to Send!');
  }
});

router.post('/contact', (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: 'mari.myzk98@gmail.com',
    subject: "Contact From Submission - Portfolio",
    html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${message}</p>
          `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: 'Message Sent' });
    }
  });
});