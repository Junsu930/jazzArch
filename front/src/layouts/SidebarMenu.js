import { NavItem } from 'reactstrap';
import classes from './SidebarMenu.module.css';
import { Link, useLocation } from 'react-router-dom';

const SidebarMenu = ({ naviArr, parentMenu }) => {
  const location = useLocation();

  return (
    <>
      <p className={classes.category}>{parentMenu}</p>
      {naviArr.map((navi, index) => (
        <NavItem key={index} className="sidenav-bg">
          <Link
            to={navi.href}
            className={
              location.pathname === navi.href
                ? 'text-primary nav-link py-3'
                : 'nav-link text-secondary py-3'
            }
          >
            <i className={navi.icon}></i>
            <span className="ms-3 d-inline-block">{navi.title}</span>
          </Link>
        </NavItem>
      ))}
    </>
  );
};

export default SidebarMenu;
