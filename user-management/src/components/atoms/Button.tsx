import React, { CSSProperties } from 'react';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, className, style, disabled}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            style={style}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;