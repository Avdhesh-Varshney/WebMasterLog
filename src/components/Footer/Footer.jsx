import "./Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div class="social-section">
        <div>
          <div>
            Made with ♡ by Avdhesh{" "}
            <a href="https://github.com/Avdhesh-Varshney/WebMasterLog">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <div class="social">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/avdhesh-varshney-5314a4233/">
                <i class="fa-brands fa-linkedin fa-lg"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2F__Avdhesh__">
                <i class="fa-brands fa-square-x-twitter fa-lg"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/Avdhesh-Varshney">
                <i class="fa-brands fa-square-github fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>{`Copyright © Web Master Log ${year}`}</div>
    </footer>
  );
};

export default Footer;
