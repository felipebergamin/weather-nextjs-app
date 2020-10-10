import styled, { css } from 'styled-components';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';

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

const BaseCarouselButton = css`
  background: transparent;
  border: none;
`;

export const CarouselButtonNext = styled(ButtonNext)`
  ${BaseCarouselButton}
`;

export const CarouselButtonBack = styled(ButtonBack)`
  ${BaseCarouselButton}
`;
