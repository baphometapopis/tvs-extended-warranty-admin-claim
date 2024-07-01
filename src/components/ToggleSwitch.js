import React from 'react';
import styled from 'styled-components';

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 34px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.checked ? '#253C80' : '#ccc')};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 34px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${props => (props.checked ? 'translateX(36px)' : 'translateX(-30px)')};
  }
`;

const Label = styled.span`
  position: absolute;
  top: 50%;
  left: ${props => (props.checked ? '10px' : '38px')};
  transform: translateY(-50%);
  font-size: 12px;
  color: white;
  pointer-events: none;
  transition: 0.4s;
`;

const ToggleSwitch = ({ isChecked, onChange }) => {
  return (
    <Switch onClick={onChange}>
      <Slider checked={isChecked} />
      <Label checked={isChecked}>{isChecked ? 'Filters' : 'No Filter'}</Label>
    </Switch>
  );
};

export default ToggleSwitch;
