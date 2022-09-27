import React from "react";
import styles from "./Module.css";

const CustomModal = ({ setIsOpen, children }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />

      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>View </h5>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <i className='pi pi-times'></i>
            </button>
          </div>

          <div className={styles.modalContent}>
            {children}
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className={styles.primaryBtn}
                  onClick={() => setIsOpen(false)}
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
