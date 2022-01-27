import AuthPageTemplate from '@Components/templates/pages/AuthPageTemplate';
import LoginForm from '@Features/auth/forms/LoginForm';

const LoginPage = () => {
  return (
    <AuthPageTemplate>
      <LoginForm />
    </AuthPageTemplate>
  );
};

export default LoginPage;
