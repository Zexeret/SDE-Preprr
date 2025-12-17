import styled from "@emotion/styled";

export const StatsBar = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.5rem;
  min-width: 200px;
  flex: 1;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }
`;

// const getTextColor = (
//   variant: "success" | "warning" | "danger" | "info",
//   theme: Theme
// ): string => {
//   switch (variant) {
//     case "info":
//       return theme.text.primary;
//     case "success":
//       return theme.success;
//     case "danger":
//       return theme.error;
//     case "warning":
//       return theme.warning;
//   }
// };

export const StatLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;
