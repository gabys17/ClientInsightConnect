import leonardo from "../assets/images/leonardoOliveira"
import gabriela from "../assets/images/gabrielaSilva.jpeg"

function About () {

    return (
        
        <section className="about">
            <h4>This website helps clinics, hospitals and doctors to manage their patients.</h4>
            <div>
                <p>Made By:</p>
            </div>
            <div className="pictureleonardo">
                <img src={leonardo}></img>
                <p><b>Leonardo Oliveira</b></p>
				<a href="https://github.com/lmcoliveira99"><img src="../assets/github-logo.png" alt="github" /></a>
				<a href="https://www.linkedin.com/in/lmcoliveira/"><img src="../assets/linkedin.png" alt="linkedin" /></a>
            </div>
            <div className="picturediana">
                <img src={gabriela}></img>
                <p><b>Gabriela Silva</b></p>
				<a href="https://github.com/gabys17"><img src="../assets/github-logo.png" alt="github" /></a>
				<a href="https://www.linkedin.com/in/gabrielavieira-da--silva/"><img src="../assets/linkedin.png" alt="linkedin" /></a>
            </div>
        </section>
        
    )
}

export default About;