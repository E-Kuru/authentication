import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const LogIn = () => {

    let navigate = useNavigate()

    const formik = useFormik({

        initialValues: {
          username: "",
          password: ""
        },

        onSubmit: values => {

            const User = {
                ...values
            }
        
            fetch('http://localhost:5000/auth/login',{
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
                    alert("All's good u're logged")
                    navigate('/admin')
                }
            })
            },

        validationSchema: Yup.object().shape({

            username: Yup.string()
                .required("Username est requis"),

            password : Yup.string()
                .required("Password requis")
        }),
    })

    return (

        <div style={{display : "flex", 
        justifyContent : "center", 
        alignItems : "center", 
        height : "100vh"}}>

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

export default LogIn
