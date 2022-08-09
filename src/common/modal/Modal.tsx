import { MouseEventHandler, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal");

if (!modalRoot) {
  throw new Error("modalRoot is not defined in dom tree");
}

export interface Props extends PropsWithChildren {
  active?: boolean;
  title?: string;
  onCancel: () => void;
}

export const Modal = ({ children, active, title, onCancel }: Props) => {
  if (!active) return null;
  const handleCrossClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onCancel();
  };
  return createPortal(
    <div className={styles.backdrop} onClick={handleCrossClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.closeBtn} onClick={handleCrossClick}>
            X
          </div>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
