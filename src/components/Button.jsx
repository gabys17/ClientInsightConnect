import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const ButtonComponent = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border-radius: 0.3rem;
  padding: 0 ${props => props.size === "sm" ? "1.1rem" : props.size === "md" ? "1.4rem" : props.size === "lg" ? "1.6rem" : "1.1rem"};
  height: ${props => props.size === "sm" ? "34px" : props.size === "md" ? "37px" : props.size === "lg" ? "40px" : "34px"};
  font-family: "Josefin sans", sans-serif;
  font-weight: 500;
  border: 1px solid transparent;
  border-color: ${props => props.change === "red" ? "#FF0000" : props.change === "green" ? "#00FF00" : props.change === "blue" ? "#0000FF" : props.change === "black" ? "#000" : "#fff"};
  color: ${props => props.change === "red" ? "#FF0000" : props.change === "green" ? "#00FF00" : props.change === "blue" ? "#0000FF" : props.change === "black" ? "#000" : "#fff"}
`;

const Button = ({ type, className, id, onClick, size, children, change }) => {
  return (
    <ButtonComponent
      type={type ? type : "button"}
      className={className ? `btn-component ${className}` : "btn-component"}
      id={id}
      onClick={onClick}
      size={size}
      change={change}
    >
      {children}
    </ButtonComponent>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.node,
  change: PropTypes.string,
};

export default Button;









