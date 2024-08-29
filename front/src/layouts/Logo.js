/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <>
      {props.type === 'min' && (
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/JlogoD.png'} width="40px" />
        </Link>
      )}
      {props.type !== 'min' && (
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/Jlogo.png'} width="100px" />
        </Link>
      )}
    </>
  );
};

export default Logo;
