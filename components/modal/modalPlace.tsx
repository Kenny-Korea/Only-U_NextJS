import { ModalItemPropsType } from "@/types";
import React from "react";
import ModalLayout from "./layout";

const ModalPlace = (props: ModalItemPropsType) => {
  const { modal } = props;

  const onClickSubmit = () => {};
  const onClickCancel = () => {};
  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      <div className="ModalPlace"></div>
    </ModalLayout>
  );
};

export default ModalPlace;
