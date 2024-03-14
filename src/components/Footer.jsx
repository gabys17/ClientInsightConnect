import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer">
      <FontAwesomeIcon icon={faGithub} ><a href="https://github.com/gabys17/ClientInsightConnect">Repository</a></FontAwesomeIcon>
        
        
        <p>Copyright © 2024 - All right reserved by InsightConnect</p>
      </div>
    </footer>
  );
}

export default Footer;
