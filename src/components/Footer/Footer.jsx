import "./Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="row-flex">
        <form action="/" method="post">
          <input type="email" placeholder="EMAIL ADDRESS" name="email" required />
          <input type="submit" placeholder="SUBSCRIBE" name="subscribe" value="SUBSCRIBE" id="Ui" required />
        </form>
      </div>
      <div className="foot">
        <div className="foot-left">
          <h1 id="Ui">Web Master Log</h1>
          <p>WebMasterLog serves as a comprehensive record of various web development endeavors,
            highlighting the versatility and capabilities of projects built with Front-end and Back-end
            Web development technologies. From interactive and responsive user interfaces to dynamic web
            applications, this repository encompasses a spectrum of web development solutions</p>
        </div>
        <div className="social">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/avdhesh-varshney-5314a4233/">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="hsl(184, 41%, 56%)" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/__Avdhesh__">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="hsl(184, 41%, 56%)" className="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/Avdhesh-Varshney">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="hsl(184, 41%,56%)" className="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yourinstagramprofile">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="hsl(184, 41%, 56%)" viewBox="0 0 50 50">
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/yourdiscordprofile">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="hsl(184, 41%, 56%)" viewBox="0 0 30 30">
                  <path d="M25.12,6.946c-2.424-1.948-6.257-2.278-6.419-2.292c-0.256-0.022-0.499,0.123-0.604,0.357 c-0.004,0.008-0.218,0.629-0.425,1.228c2.817,0.493,4.731,1.587,4.833,1.647c0.478,0.278,0.638,0.891,0.359,1.368 C22.679,9.572,22.344,9.75,22,9.75c-0.171,0-0.343-0.043-0.501-0.135C21.471,9.598,18.663,8,15.002,8 C11.34,8,8.531,9.599,8.503,9.615C8.026,9.892,7.414,9.729,7.137,9.251C6.86,8.775,7.021,8.164,7.497,7.886 c0.102-0.06,2.023-1.158,4.848-1.65c-0.218-0.606-0.438-1.217-0.442-1.225c-0.105-0.235-0.348-0.383-0.604-0.357 c-0.162,0.013-3.995,0.343-6.451,2.318C3.564,8.158,1,15.092,1,21.087c0,0.106,0.027,0.209,0.08,0.301 c1.771,3.11,6.599,3.924,7.699,3.959c0.007,0.001,0.013,0.001,0.019,0.001c0.194,0,0.377-0.093,0.492-0.25l1.19-1.612 c-2.61-0.629-3.99-1.618-4.073-1.679c-0.444-0.327-0.54-0.953-0.213-1.398c0.326-0.443,0.95-0.541,1.394-0.216 C7.625,20.217,10.172,22,15,22c4.847,0,7.387-1.79,7.412-1.808c0.444-0.322,1.07-0.225,1.395,0.221 c0.324,0.444,0.23,1.066-0.212,1.392c-0.083,0.061-1.456,1.048-4.06,1.677l1.175,1.615c0.115,0.158,0.298,0.25,0.492,0.25 c0.007,0,0.013,0,0.019-0.001c1.101-0.035,5.929-0.849,7.699-3.959c0.053-0.092,0.08-0.195,0.08-0.301 C29,15.092,26.436,8.158,25.12,6.946z M11,19c-1.105,0-2-1.119-2-2.5S9.895,14,11,14s2,1.119,2,2.5S12.105,19,11,19z M19,19 c-1.105,0-2-1.119-2-2.5s0.895-2.5,2-2.5s2,1.119,2,2.5S20.105,19,19,19z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://facebook.com/yourfacebookprofile">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="hsl(184, 41%, 56%)" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.95 2.87 7.22 6.57 7.88v-5.58H4.64V8h1.93V6.24c0-1.9 1.12-2.95 2.84-2.95.82 0 1.68.14 1.68.14v1.85h-.95c-.94 0-1.23.58-1.23 1.17V8h2.1l-.34 2.3h-1.76v5.58C13.13 15.22 16 11.95 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </li>
          </ul>
          <div className="social-section">
            <div>
              <div>{`© ${year} All Rights Reserved`}</div>
              <div>
                <b>Made By Master Web Log </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
