import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import classes from './SignUp.module.css';
import { useEffect, useState } from 'react';
import {
  doSignUp,
  getEmailDupCheck,
  getNicknameDupCheck,
} from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailRegError, setEmailRegError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  // 이메일 중복 확인 API 호출
  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        try {
          const response = await getEmailDupCheck(email);

          if (response.data) {
            setEmailError('이 이메일은 이미 사용 중입니다.');
          } else {
            setEmailError('');
          }
        } catch (e) {
          console.error('이메일 중복 확인 오류:', e);
        }
      }
    };
    checkEmail();
  }, [email]);

  // 닉네임 중복 확인 API 호출
  useEffect(() => {
    const checkNickname = async () => {
      if (nickname) {
        try {
          const response = await getNicknameDupCheck(nickname);

          if (response.data) {
            setNicknameError('이 닉네임은 이미 사용 중입니다.');
          } else {
            setNicknameError('');
          }
        } catch (e) {
          console.error('닉네임 중복 확인 오류:', e);
        }
      }
    };
    checkNickname();
  }, [nickname]);

  function checkEmailHandler(e) {
    const emailValue = e.target.value;
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 공백이 아닐 때만 검증 수행
    if (emailValue !== '' && !emailRegex.test(emailValue)) {
      setEmailRegError('이메일 형식을 확인해주세요.');
    } else {
      setEmailRegError('');
    }
  }

  function checkNicknameHandler(e) {
    setNickname(e.target.value);
  }

  function checkPasswordHandler(e) {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    // 공백이 아닐 때만 검증 수행
    if (passwordValue !== '' && !passwordRegex.test(passwordValue)) {
      setPasswordError(
        '비밀번호는 최소 8자 이상, 영어 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.',
      );
    } else {
      setPasswordError('');
    }
  }

  function checkConfirmPasswordHandler(e) {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    // 공백이 아닐 때만 검증 수행
    if (confirmPasswordValue !== '' && password !== confirmPasswordValue) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError('');
    }
  }

  async function signUpHandler(e) {
    e.preventDefault();

    // 조건 확인
    if (
      emailError ||
      emailRegError ||
      nicknameError ||
      passwordError ||
      passwordMatchError
    ) {
      alert('입력한 정보를 확인하세요.');
      return;
    }

    if (!email || !nickname || !password || !confirmPassword) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    const signUpData = {
      email: email,
      nickname: nickname,
      password: password,
    };
    // 회원가입 처리 로직
    const response = await doSignUp(signUpData);

    if (response.status === 201) {
      alert('회원가입이 완료되었습니다.');
      console.log('저장된 사용자:', response.data);
      navigate('/starter');
      // 필요에 따라 로그인 페이지로 리다이렉트 등 추가 처리
    } else {
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  }

  return (
    <div className={classes.signUp}>
      <h2>회원가입</h2>
      <Form className={classes.form}>
        <FormGroup>
          <Label for="exampleEmail">이메일</Label>
          <Input
            onChange={checkEmailHandler}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
          />
          {emailError && <p className={classes.error}>{emailError}</p>}
          {emailRegError && <p className={classes.error}>{emailRegError}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="nickname">닉네임</Label>
          <Input
            onChange={checkNicknameHandler}
            type="text"
            name="nickname"
            id="nickname"
          />
          {nicknameError && <p className={classes.error}>{nicknameError}</p>}
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">비밀번호</Label>
          <Input
            onChange={checkPasswordHandler}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
          />
          {passwordError && <p className={classes.error}>{passwordError}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">비밀번호 확인</Label>
          <Input
            onChange={checkConfirmPasswordHandler}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
          />
          {passwordMatchError && (
            <p className={classes.error}>{passwordMatchError}</p>
          )}
        </FormGroup>
        <Button onClick={signUpHandler} className="m-2" type="button">
          회원가입
        </Button>
      </Form>
    </div>
  );
};
export default SignUp;
