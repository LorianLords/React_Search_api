import React, { useEffect, useState } from "react";
import s from "./FooterPopup.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { clearSelection } from "../../state/CardList/CardsSlice.ts";

const FooterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedCards } = useAppSelector((state) => state.cardList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      if (selectedCards.length !== 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 100);
  }, [selectedCards]);

  const handleDeselect = () => {
    dispatch(clearSelection());
  };
  return (
    <div className={`${s.popupContainer} ${isVisible ? s.visible : s.hidden}`}>
      <div className={s.popupWrapper}>
        <div className={s.checkCount}>
          <p>{selectedCards.length} items selected</p>
        </div>
        <div className={s.btnsContainer}>
          <button className={s.downBtn}>Download</button>
          <button className={s.cancelBtn} onClick={handleDeselect}>
            Deselect all
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterPopup;
