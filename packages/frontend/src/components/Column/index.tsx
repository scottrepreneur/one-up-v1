import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ColumnCenter = styled(Column)`
  width: 100%;
  align-items: center;
`;

interface ColumnProps {
  gap?: number;
  justify?: 'center' | 'space-between' | 'space-around';
  width?: string;
}

export const AutoColumn = styled.div<ColumnProps>`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => gap && gap.toString() + 'px'};
  justify-items: ${({ justify }) => justify && justify};
  width: ${({ width }) => width && width};
`;

export default Column;
