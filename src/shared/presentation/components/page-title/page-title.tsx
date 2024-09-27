import styles from "./page-title.css";

interface Props {
  title: string;
  subtitle?: string;
}

export const PageTitle = ({ title, subtitle }: Props) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {subtitle && (
        <>
          <br />
          <h4>{subtitle}</h4>
        </>
      )}
    </div>
  );
};

export default PageTitle;
