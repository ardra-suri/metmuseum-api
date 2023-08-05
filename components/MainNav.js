import { useState } from "react";
import { useRouter } from "next/router";
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  let token = readToken();
  const router = useRouter();

  const logout = () => {
    setIsExpanded(false)
    removeToken()
    router.push('/login')
  }
  const submit = async (submit) => {
    submit.preventDefault();
    setIsExpanded(false);
    let queryString = `title=true&q=${encodeURIComponent(searchField)}`
    setSearchHistory(await addToHistory(queryString))
    router.push(`/artwork?${queryString}`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Ardra Surendran</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={e => setIsExpanded(!isExpanded)}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={e => setIsExpanded(false)}>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={e => setIsExpanded(false)}>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            &nbsp;&nbsp;
            <Form className="d-flex" onSubmit={submit} >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
            &nbsp;&nbsp;
            <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
            <Link href="/favourites" passHref legacyBehavior>
              <NavDropdown.Item active={router.pathname === "/favourites"} onClick={e => setIsExpanded(false)}>Favourites</NavDropdown.Item>
              </Link>
            <Link href="/history" passHref legacyBehavior>
              <NavDropdown.Item active={router.pathname === "/history"} onClick={e => setIsExpanded(false)}>Search History</NavDropdown.Item>
              </Link>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/><br/>
    </>
  );
}
