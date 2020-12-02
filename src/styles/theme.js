import { css } from 'styled-components';
export const theme = {
  pink: '#ff3a5c',
  grey: '#eeeeee',
  black: '#222222',
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexSpaceBetweenCenter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const flexColumnSpaceBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const flexRow = css`
  display: flex;
  justify-content: center;
`;
