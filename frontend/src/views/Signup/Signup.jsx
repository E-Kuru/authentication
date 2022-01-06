import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {

    const [file, setFile] = useState(null)

    let navigate = useNavigate()

    const formik = useFormik({

        initialValues: {
          username: "",
          email : "",
          password: "",
          age : 0,
        },

        onSubmit: values => {

            const User = {
                username : values.username,
                password : values.password
            }

            fetch('http://localhost:5000/auth/signup',{
                method : 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {

                if(res.status === 406){
                    alert(`Error ${res.status} this email or username already exist`)
                }
                
                return res.json()
            })
            .then(res => {
                
                const formdata = new FormData()
                formdata.append("photo", file, file.name)        

                fetch(`http://localhost:5000/files/${res.id}`, {
                    method: "post",
                    body: formdata
                  })
                    .then(response => response.json())
                    .then(data => {
                      console.log(data)
                })

                alert("All's good u're now a member")

                fetch('http://localhost:5000/auth/login',{
                    credentials: 'include',
                    method : 'POST',
                    headers: {
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify(User)
                })
                .then(res => {
                    if(res.status === 401){
                        alert(`Error ${res.status} unauthorized`)
                    } 
                    else {
                        console.log('ok');
                    }
                })        

            })
        },

        validationSchema: Yup.object().shape({

            username: Yup.string()
                .required("Username est requis"),

            password: Yup.string()
                .min(4, "password trop court"),

            age : Yup.number()
                .required('Votre age est requis'),

            email : Yup.string()
                .required("Email requis")
        }),
    })

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <div style={{display : "flex", justifyContent : "center", alignItems : "center", height : "100vh"}}>

            <form style=
            {{width : '40%', 
            border : "2px solid #cccc", 
            padding :'2%', 
            borderRadius : "10px", 
            display : "flex", 
            flexDirection : 'column'}} 
            onSubmit={formik.handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                    className="form-control" 
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                    className="form-control" 
                    type="email" 
                    name='email' 
                    value={formik.values.email} 
                    onChange={formik.handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input 
                    className="form-control" 
                    type="number" 
                    name='age' 
                    value={formik.values.age} 
                    onChange={formik.handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                    className="form-control" 
                    type="password" 
                    name='password' 
                    value={formik.values.password} 
                    onChange={formik.handleChange}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">File Picture</label>
                    <input 
                    className="form-control" 
                    type="file" 
                    onChange={handleFileChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

                <Link to="/" style={{marginTop : "4%", textDecoration : "none"}}>Already a member ?</Link>
            </form>
        </div>
    )
}

export default Signup