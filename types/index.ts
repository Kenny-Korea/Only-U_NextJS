// ModalPlan, ModalPost, ModalPlace의 props 타입
export type ModalItemPropsType = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ModalLayoutPropsType = {
  children: React.ReactNode;
  modal: boolean;
  onClickSubmit: () => void;
  onClickCancel: () => void;
};

export type ItemPropsType = {
  readonly item: {
    readonly id: string;
    readonly title: string;
    readonly hashtag?: (string | null)[];
    readonly content?: string;
    readonly url?: string[];
    readonly writer: string;
    readonly date: number;
  };
};
