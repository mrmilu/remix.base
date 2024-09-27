import { useBreakpointsMatch } from "@front_web_mrmilu/hooks";

interface Props {
  title: string;
  subtitle?: string;
}

export const PageTitle = ({ title, subtitle }: Props) => {
  const { mdAndUp } = useBreakpointsMatch();
  return mdAndUp ? (
    <div>
      <h2>{title}</h2>
      {subtitle && (
        <>
          <br />
          <h4>{subtitle}</h4>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default PageTitle;
