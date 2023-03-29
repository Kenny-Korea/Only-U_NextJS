type Props = { status: "Uploading" | "Deleting" };

const ModalStatus = (props: Props) => {
  const { status } = props;
  return (
    <div className="w-screen h-screen fixed bg-white bg-opacity-40 centerItem z-50">
      {status}...
    </div>
  );
};

export default ModalStatus;
