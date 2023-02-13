const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const client = Sib.ApiClient.instance;
const User = require("../models/user");
const ForgotPassword = require("../models/forgotpassword");

exports.forgotpassword = async (req, res) => {
    // console.log(process.env.MAIL_API_KEY);
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const id = uuid.v4();
      user.createForgotpassword({ id, active: true }).catch((err) => {
        throw new Error(err);
      });
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.MAIL_API_KEY;
      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email: "magzetic@gmail.com",
      };
    
      const reciever = [
        {
          email: req.body.email,
        },
      ];
      tranEmailApi
        .sendTransacEmail({
          sender,
          to: reciever,
          subject: "TEst Forgot Password Email",
          textContent: "Hello Test Successfull",
          htmlContent : ` <a href="http://localhost:3000/resetpassword/${id}">Reset password</a>`
        })
        .then((response) => {
          res.status(201).json(response);
        })
        .catch(console.log);
    }
    else {
        // throw new Error('User Does Nt Exist')
        res.status(404).json({message : 'User Not Exist'});
    }
  } catch(err){
    console.log(err);
    return res.json({messagee : err , success : false})
  }
};

exports.resetpassword = async(req,res) =>{
    const id  = req.params.id;
    ForgotPassword.findOne({where : {id}}).then(forgotpasswordrequest=>{
       if(forgotpasswordrequest){
        forgotpasswordrequest.update({active : false});
        res.status(201).send(
          `<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
          </html>`
        )
        res.end()
       }
    })
}


exports.updatepassword = async (req,res) =>{
  try {
    const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        ForgotPassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
        User.findOne({where: { id : resetpasswordrequest.userEmId}}).then(user => {
             
                if(user) {
                    const saltRounds = 3;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                           
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    
  } catch (error) {
    console.log(error);
    return res.status(403).json({error , success : false})
  }
}

