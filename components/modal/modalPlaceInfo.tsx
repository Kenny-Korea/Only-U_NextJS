import React from "react";
import ModalLayout from "./layout";

const ModalPlaceInfo = (props: any) => {
  const { modal } = props;

  const onClickSubmit = () => {};
  const onClickCancel = () => {};

  return (
    <ModalLayout
      modal={modal}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
    >
      <h1>hello</h1>
    </ModalLayout>
  );
};

export default ModalPlaceInfo;
