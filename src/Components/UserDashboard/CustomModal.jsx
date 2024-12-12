const CustomModal = ({children, title, setIsUpdate}) => {
  return (
    <div>
      <dialog id="custom-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={() => {
                setIsUpdate && setIsUpdate(false);
            }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-xl mb-5">{title}</h3>
          {
            children
          }
        </div>
      </dialog>
    </div>
  );
};

export default CustomModal;
