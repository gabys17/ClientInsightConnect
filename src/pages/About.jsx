/*import leonardo from "../assets/images/leonardoOliveira"*/
import gabriela from "../assets/WhatsApp Image 2024-03-14 at 21.10.54.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function About () {

    return (
        
        <section className="about">
			<div className="text-about"><h4>We developed this website! Visit us on linkedin and github to get to know us better.</h4></div>
            
            
			<div className="picture">
				<img src="
				" alt="" />
				<div className="container-text">
					<p><b>Leonardo Oliveira</b></p>
					<FontAwesomeIcon icon={faGithub} ><a href="https://github.com/lmcoliveira99"></a></FontAwesomeIcon>
					
					<FontAwesomeIcon icon={faLinkedin} ><a href="https://www.linkedin.com/in/lmcoliveira/"></a></FontAwesomeIcon>
				</div>
            </div>
            <div className="picture">
                <img src={gabriela} alt=""></img>
				<div className="container-text">
					<p><b>Gabriela Silva</b></p>
					<FontAwesomeIcon icon={faGithub} ><a href="https://github.com/gabys17"></a></FontAwesomeIcon>
					
					<FontAwesomeIcon icon={faLinkedin} ><a href="https://www.linkedin.com/in/gabrielavieira-da--silva/"></a></FontAwesomeIcon>
				</div>
            </div>
        </section>  
        
    )
}

export default About;