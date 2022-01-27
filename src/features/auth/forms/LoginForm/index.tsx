import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import { useTranslation } from "react-i18next";
import message from "@Tools/message";
import { useAuth } from "@Providers/AuthProvider";
import Input from "@Components/UI/atoms/Input";
import Button from "@Components/UI/atoms/Button";
import Typography from "@Components/UI/atoms/Typography";
import Alert from "@Components/UI/atoms/Alert";
import Form from "@Components/UI/molecules/Form";
import ReCaptcha from "@Components/UI/molecules/ReCaptcha";
import Space from "@Components/UI/atoms/Space";
import "./index.less";

const { Title } = Typography;

export const LoginForm = memo(
  forwardRef(
    (
      {
        defaultValues,
        verifyCaptcha,
        onSubmit,
        onChangeView,
        queryParams,
        loginLoading,
        loginError,
      }: any,
      ref
    ) => {
      const [recaptchaToken, setRecaptchaToken] = useState(null);
      const [loading, setLoading] = useState(false);
      const [disableForm, setDisableForm] = useState(true);
      const [alert, setAlert] = useState<any>({});

      const [loginform] = Form.useForm();
      const recaptchaRef = useRef<any>();
      const { t } = useTranslation();

      useImperativeHandle(ref, () => ({
        ...loginform,
      }));

      useEffect(() => {
        setDisableForm(false);
      }, [queryParams]);

      const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
      };

      const handleRecaptchaErrored = () => {
        setRecaptchaToken(null);
      };

      const onFinish = async (values) => {
        if (!verifyCaptcha || !onSubmit || disableForm) return false;
        try {
          setLoading(true);
          const captchaResponse = await verifyCaptcha(recaptchaToken);
          if (captchaResponse.success) {
            const result = await onSubmit(values);
            setLoading(false);
            setAlert(
              result?.message
                ? {
                    type: result.status || "error",
                    message: result?.message,
                    show: true,
                    showIcon: true,
                    closable: true,
                  }
                : {}
            );

            recaptchaRef.current && recaptchaRef.current.reset();
            handleRecaptchaChange(null);
          }
        } catch (e) {
          setLoading(false);
          message.error(e.message);
        }
      };

      const handleForgotPasswordClick = () => {
        onChangeView && onChangeView("forgot-password");
      };

      const handleAfterAlertClose = () => {
        setAlert({});
      };

      return (
        <Form
          form={loginform}
          layout="vertical"
          name="login-form"
          onFinish={onFinish}
          initialValues={{
            ...(defaultValues || {}),
          }}
          scrollToFirstError
          validateTrigger="onBlur"
          className="auth-form"
        >
          <Space direction="vertical" size="middle" className="w-100">
          <Title level={4} className="font-weight-bold auth-form-title">
            {t("login_page_login_header")}
          </Title>
            <Form.Item
              name="email"
              label={t("login_page_email_address")}
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input autoComplete="off"/>
            </Form.Item>
            <Form.Item
              name="password"
              label={t("login_page_password")}
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password autoComplete="off"/>
            </Form.Item>
            <div className="flex justify-content-start mb-md">
              <a onClick={handleForgotPasswordClick}>
                {t("login_page_forgot_password")}
              </a>
            </div>
            <ReCaptcha
              onChange={handleRecaptchaChange}
              onErrored={handleRecaptchaErrored}
              className="mb-lg"
              ref={recaptchaRef}
            />
            <Form.Item className="m-b-none">
              <Button
                type="primary"
                htmlType="submit"
                className="font-weight-bold w-100 auth-form-submit"
                disabled={disableForm || !recaptchaToken}
                loading={loginLoading || loading}
              >
                {t("login_page_login")}
              </Button>
            </Form.Item>
            <div className="flex justify-content-center">
              {loginError && (
                <Alert
                  className="w-100"
                  type="error"
                  afterClose={handleAfterAlertClose}
                  message={loginError?.message}
                  {...alert}
                />
              )}
            </div>
          </Space>
        </Form>
      );
    }
  )
);

export default forwardRef((props, ref) => {
  const api = useAuth();

  if (!api) {
    throw new Error("No Provider detected");
  }

  return (
    <LoginForm
      ref={ref}
      queryParams={api.state.urlQueryParams}
      verifyCaptcha={api.verifyCaptcha}
      resetCaptcha={api.handleResetCaptcha}
      onSubmit={api.handleLogin}
      onChangeView={api.handleChangeView}
      loginLoading={api.state.loginLoading}
      loginError={api.state.loginError}
      {...props}
    />
  );
});
