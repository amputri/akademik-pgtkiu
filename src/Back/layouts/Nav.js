import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Nav = () => {
    const history = useHistory()

    function hapus() {
        sessionStorage.clear()
        history.push('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-light justify-content-between shadow-sm py-3" style={{backgroundColor: '#2196f3'}}>
                <Link to="/admin/beranda" className="text-decoration-none">
                    <span className="navbar-brand text-white ms-3">PG & TKIU EL-HAQ || Data Akademik</span>
                </Link>
                <button style={{backgroundColor: '#e91e63'}} onClick={hapus} className="btn my-2 my-sm-0 me-3 text-white" type="submit"> <i className="fas fa-sign-out-alt" /> Logout</button>

            </nav>

        </div>
    )
}

export default Nav
