import React, { Component } from 'react';
import classnames from 'classnames';

import UikContentTitle from '../UikContentTitle';

import s from './input.module.scss';

interface State {
  value: string;
  errorMessage?: string;
}

interface DataCheck {
  pattern: RegExp;
  test: (v: string) => boolean;
}

export interface Check {
  pattern: RegExp | DataCheck;
  noMatchMessage: string;
}

interface UikInputProps {
  wrapperProps?: { className: string };
  label?: React.ReactNode;
  name?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  clear?: boolean;
  errorMessage?: string;
  focus?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  valueCheck?: Check;
  onInput?: (value: string) => void;
  disabled?: boolean;
}

class Input extends Component<UikInputProps, State> {
  ref: React.RefObject<HTMLInputElement> = React.createRef();

  focusInput = () => {
    this.ref.current!.focus();
  }

  constructor(props: UikInputProps) {
    super(props);
    this.state = { value: this.props.value ? this.props.value : '', errorMessage: props.errorMessage };
  }

  componentWillReceiveProps(nextProps: UikInputProps) {
    (nextProps.value || nextProps.value === '') && this.setState({ value: nextProps.value });
  }

  render() {
    const {
      className,
      wrapperProps,
      name,
      icon,
      label,
      focus, // eslint-disable-line
      clear,
      iconPosition,
      type,
      value,
      valueCheck,
      onInput,
      // size
      ...rest
    } = this.props;

    return (
      <div
        { ...wrapperProps }
        className={ classnames(wrapperProps ? wrapperProps.className : undefined, {
          [s.clear]: clear,
        }) }
      >
        { label && (
          <div className={s.header}>
            <UikContentTitle>
              {label}
            </UikContentTitle>
            {
              this.state.errorMessage && (
                <p className={s.errorMessage}>
                  {this.state.errorMessage}
                </p>
              )
            }
          </div>
        )}
        <div
          className={ classnames(s.inputWrapper) }
        >
          {
            icon && (
              <span className={ classnames(s.iconWrapper, {
                [s.iconWrapperRight]: iconPosition === 'right',
              }) }
              >
                {icon}
              </span>
            )
          }
          <input
            ref={this.ref}
            className={ classnames(className, s.input, {
              [s.errorHighlight]: this.state.errorMessage,
            }) }
            name={ name }
            type={ type ? type : 'text'}
            value={this.state.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;

              if ((this.props.valueCheck && value && this.props.valueCheck.pattern.test(value))
               || !this.props.valueCheck || value.length === 0) {
                this.setState({ value, errorMessage: this.props.errorMessage });
                this.props.onInput && this.props.onInput(value);
              } else {
                this.setState({ value, errorMessage: this.props.valueCheck.noMatchMessage });
              }
              e.preventDefault();
            }}
            {...rest}
          />
        </div>

      </div>
    );
  }
}

export default Input;
