import React from 'react'
import './Header.css'

const Header = () => {

    return (
        <div className ='headerWebsite'>
            <nav className ='navbarWebsite' >
                <div>
                    <p>Easynoonoo</p>
                </div>                                
                <input type='button' value = 'Connexion'/>
            </nav>            
        </div>
    )
}


export default Header