import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = process.env.RECAPTCHA_SITE_KEY || ''
const ReCaptcha = forwardRef<any, any>(({ ...rest }: any, ref) => {
  return (
    <ReCAPTCHA sitekey={siteKey} ref={ref} {...rest} />
  );
});

export default ReCaptcha;
