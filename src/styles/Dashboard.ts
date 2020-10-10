import styled from 'styled-components';
import { Card } from '~/components';

export const HorizontalCard = styled(Card)`
  display: flex;
`;

export const CenterContent = styled.div`
  display: flex;
  align-self: 'center';
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
