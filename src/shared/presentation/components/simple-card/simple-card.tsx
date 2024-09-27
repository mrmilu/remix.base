import { typographyStyles } from "@/src/shared/presentation/styles/typography.css";
import type { KeyboardEventHandler, MouseEventHandler } from "react";
import css from "./simple-card.css";

export interface SimpleCardProps {
  title: string;
  subtitle: string;
  onClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
}

export const SimpleCard = ({ title, subtitle, onClick, onKeyDown, ...rest }: SimpleCardProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={onClick} onKeyDown={onKeyDown} className={css.wrapper({ onClick: Boolean(onClick) })} {...rest}>
      <div className={css.avatar} />
      <div className={css.content}>
        <h4 className={typographyStyles.bodyL}>{title}</h4>
        <p className={css.p}>{subtitle}</p>
      </div>
    </div>
  );
};
