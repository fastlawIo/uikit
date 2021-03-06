import React from 'react';
import classnames from 'classnames';

import cls from './nav-title.module.scss';

type UikNavTitleProps = {
  children?: React.ReactNode,
  className?: string,
};

const UikNavTitle = ({
  children,
  className,
  ...rest
}: UikNavTitleProps) => (
  <span
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {children}
  </span>
);

UikNavTitle.defaultProps = {
  className: null,
  children: null,
};

export default UikNavTitle;
