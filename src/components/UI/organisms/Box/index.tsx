import { Spacing } from '@Types/spacing';
import './index.less';

export interface BoxProps extends Spacing {
  children?: any;
  className?: any;
}

const Box = ({ className, children, ...rest }: BoxProps) => {
  const spacingClasses = Object.keys(rest)
    .map((el) => `${el}-${rest[el]}`)
    .join(' ');

  return (
    <div className={`${spacingClasses} ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default Box;
