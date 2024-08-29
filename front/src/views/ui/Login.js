import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import classes from './Login.module.css';
import { useState } from 'react';
import { doLogin, getLoginData } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContexet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, setUserData } = useAuth();

  async function loginHandler(e) {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await doLogin(loginData);
      // 로그인 성공 시 처리
      const token = response.data;
      localStorage.setItem('token', token);

      var userData = await getLoginData(token);

      login();
      setUserData(userData);
      console.log(userData);
      alert('로그인 성공');
      navigate('/starter');
    } catch (error) {
      alert('로그인에 실패하였습니다. 이메일과 패스워드를 확인해주세요');
    }
  }

  function inputEmailHandler(e) {
    setEmail(e.target.value);
  }

  function inputPasswordHandler(e) {
    setPassword(e.target.value);
  }

  function gotoSignUpHandler(e) {
    e.preventDefault();
    navigate('/signUp');
  }

  return (
    <div className={classes.login}>
      <h2>로그인</h2>
      <Form className={classes.form}>
        <FormGroup>
          <Label for="exampleEmail">이메일</Label>
          <Input
            onChange={inputEmailHandler}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">비밀번호</Label>
          <Input
            onChange={inputPasswordHandler}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
          />
        </FormGroup>
        <Button type="button" onClick={loginHandler}>
          로그인
        </Button>
        <Button className="m-2" type="button" onClick={gotoSignUpHandler}>
          회원가입
        </Button>
      </Form>
    </div>
  );
};
export default Login;
