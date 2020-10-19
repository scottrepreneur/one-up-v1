import styled from 'styled-components';

type RowProps = {
  align?: 'center' | 'start' | 'end';
  justify?: 'center' | 'space-between';
  gap?: number;
};

const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  align-items: ${({ align }) => align && align};
  justify-content: ${({ justify }) => justify && justify};
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`;

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const AutoRow = styled(Row)`
  flex-wrap: wrap;
  margin: ${({ gap }) =>
    gap &&
    (Array.isArray(gap) ? gap[1].toString() + 'px' : gap.toString() + 'px')};
  & > * {
    margin: ${({ gap }) =>
      gap &&
      (Array.isArray(gap)
        ? gap[1].toString() + 'px'
        : gap.toString() + 'px')} !important;
  }
`;
// ${({ theme }) => theme.mediaWidth.upToMedium<ChildrenProps>`
//   margin: ${({ gap }) =>
//     gap &&
//     (Array.isArray(gap) ? gap[0].toString() + 'px' : gap.toString() + 'px')};
//   & > * {
//     margin: ${({ gap }) =>
//       gap &&
//       (Array.isArray(gap)
//         ? gap[0].toString() + 'px'
//         : gap.toString() + 'px')} !important;
//   }
// `}

export const RowFixed = styled(Row)`
  width: fit-content;
`;

export default Row;
