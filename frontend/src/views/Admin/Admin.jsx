import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Admin = () => {

    const [Users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/admin', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => setUsers(res))
    }, [])

    return (
        <>

        <h1 style={{textAlign : "center", marginTop : "1%"}}>There are all users my dear..</h1>
        <ul className="list-group fs-3 mt-5">
            {Users.map(e => (
                <>
                <li key={e.email} className="list-group-item d-flex justify-content-around">
                    Username : {e.username} 
                    <ul>Age : {e.age}</ul>
                </li>
                </>
                ))}
        </ul>

        <Link to="/">Back to loggin ?</Link>
            
        </>
    )
}

export default Admin
