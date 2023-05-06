import React from 'react';
import {
  StyledSection,
  StyledSectionDescription,
  StyledSectionTitle,
} from './styles';

const Section = ({children, title, description}) => {
  return (
    <StyledSection>
      <StyledSectionTitle>{title}</StyledSectionTitle>
      <StyledSectionDescription>{description}</StyledSectionDescription>
      {children}
    </StyledSection>
  );
};

export default Section;
