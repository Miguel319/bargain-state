import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { handleLogout } from "../../utils/auth";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;

  const isActive = route => route === router.pathname;

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive("/")}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em", fontSize: "15px" }}
            >
              Bargain State
            </Image>
          </Menu.Item>
        </Link>
        <div
          // Tim Sykes-

          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Link href="/cart">
            <Menu.Item header active={isActive("/cart")}>
              <Icon name="cart" size="large"></Icon>
              Cart
            </Menu.Item>
          </Link>
          {isRootOrAdmin && (
            <Link href="/create">
              <Menu.Item header header active={isActive("/create")}>
                <Icon size="large" name="add circle"></Icon>
                Create
              </Menu.Item>
            </Link>
          )}

          {user ? (
            <>
              <Link href="/account">
                <Menu.Item header header active={isActive("/account")}>
                  <Icon size="large" name="user"></Icon>
                  Account
                </Menu.Item>
              </Link>
              <Menu.Item onClick={handleLogout} header>
                <Icon size="large" name="sign out"></Icon>
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Link href="/login">
                <Menu.Item header header active={isActive("/login")}>
                  <Icon size="large" name="sign in"></Icon>
                  Sign in
                </Menu.Item>
              </Link>

              <Link href="/signup">
                <Menu.Item header header active={isActive("/signup")}>
                  <Icon size="large" name="signup"></Icon>
                  Sign up
                </Menu.Item>
              </Link>
            </>
          )}
        </div>
      </Container>
    </Menu>
  );
}

export default Header;
