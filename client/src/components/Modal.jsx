const Modal = ({ onClose, children }) => {
  return (
    <div
      onClick={() => onClose(false)}
      className="fixed top-0 left-0 h-fulll min-h-screen w-full bg-black/[.212] flex justify-center items-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="overflow-y-auto max-h-[80vh] bg-white rounded-xl box-shadow-modal p-5 w-[45%] lg:w-[60%] lg:ml-56"
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
