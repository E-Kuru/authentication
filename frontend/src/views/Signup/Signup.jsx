import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Signup = () => {

    let navigate = useNavigate()

    const [AllUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/admin', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => setAllUsers(res))
    }, [])

    const formik = useFormik({

        initialValues: {
          username: "",
          age : 0,
          email : "",
          password: ""
        },

        onSubmit: values => {

            const newUser = {
                id: AllUsers[AllUsers.length - 1].id + 1,    
                ...values        
            }
    
            fetch('http://localhost:5000/auth/signup',{
                method : 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(newUser)
            })
            .then(res => {
                if(res.status === 406){
                    alert(`Error ${res.status} this email already exist`)
                } 
                else {
                    alert("All's good u're now a member")
                    navigate('/admin')
                }
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

                <button type="submit" className="btn btn-primary">Submit</button>

                <Link to="/" style={{marginTop : "4%", textDecoration : "none"}}>Already a member ?</Link>
            </form>
        </div>
    )
}

export default Signup