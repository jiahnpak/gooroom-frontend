import {Form} from 'react-bootstrap';
import styled from 'styled-components';

export const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  padding-top: 2rem;
`;

export const StyledProfileName = styled.h2`
  font-size: 1.25rem;
`;

export const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
`;

export const StyledSetting = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  margin-bottom: 3rem;
`;

export const StyledSettingHead = styled.h2`
  width: 100%;
  padding: 1rem 1.25rem;

  font-size: 1.25rem;

  color: ${({theme, color}) => color && theme.colors[color]};
  border-bottom: 1px solid ${({theme}) => theme.colors.divider};
`;

export const StyledSettingBody = styled.div`
  padding: 0 0.75rem;
`;

export const StyledForm = styled(Form)`
  min-width: 20rem;
`;

export const StyledDescription = styled.p`
  color: ${({theme}) => theme.colors.textDefault};
  margin-bottom: 2rem;
`;
