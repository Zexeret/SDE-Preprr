import styled from "@emotion/styled";

export const StatCard = styled.div`
  ${({ theme: { background, text, secondaryBorder } }) => `
      flex: 1;
  min-width: 150px;
  background: ${background};
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${secondaryBorder};

  .label {
    color: ${text.secondary};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${text.primary};
  }
    
    `}
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;
