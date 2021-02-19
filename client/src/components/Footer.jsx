import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <footer>
            <p>Copyright Joe Au-Yeung {currentYear}</p>
        </footer>
    )
}

export default Footer;