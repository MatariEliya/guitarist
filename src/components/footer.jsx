function Footer() {
  return (
    <footer style={{display: "flex", flexDirection: "column"}}>
      <span style={{fontSize: "1vw"}}>© {new Date().getFullYear()} guitarist</span>
      <span style={{fontSize: "1vw"}}>Want to help the guitar community? Want to be a creator on the website too? send us an email at <a href="mailto:eliya.noham@gmail.com" style={{color: "white"}}>eliya.noham@gmail.com</a></span>
    </footer>
  );
}

export default Footer;
