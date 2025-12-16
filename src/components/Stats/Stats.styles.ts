import styled from "@emotion/styled";
import type { Theme } from "../../theme";

export const StatCard = styled.div`
  ${({ theme: { surface, text, border } }) => `
    flex: 1;
    min-width: 150px;
    background: ${surface};
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid ${border};
    display: flex;
    align-items: center;
    justify-content: space-around;

  .label {
    color: ${text.secondary};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

    `}
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const getTextColor = (
  variant: "success" | "warning" | "danger" | "info",
  theme: Theme
): string => {
  switch (variant) {
    case "info":
      return theme.text.primary;
    case "success":
      return theme.success;
    case "danger":
      return theme.error;
    case "warning":
      return theme.warning;
  }
};

export const ValueContainer = styled.div<{
  readonly $variant: "success" | "warning" | "danger" | "info";
}>`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => getTextColor(props.$variant, props.theme)};
`;
