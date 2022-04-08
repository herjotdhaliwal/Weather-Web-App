import Nav from 'react-bootstrap/Nav'

function Navigation() {
  return (
    <Nav className="justify-content-center" defaultActiveKey="/">
      <Nav.Item className="weather">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="weather" eventKey="link-1" href="/map">Map</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;