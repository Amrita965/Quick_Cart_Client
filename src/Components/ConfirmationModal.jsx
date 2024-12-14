const ConfirmationModal = ({ handleDelete }) => {
  return (
    <dialog id="confirmation-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <div className="h-12 w-12 bg-[#FCF0F0] flex justify-center items-center rounded-lg my-4">
            <i className="fa-regular fa-trash-can text-red-500 text-2xl"></i>
          </div>
        </div>
        <h3 className="font-semibold text-xl">
          Are you sure you want to delete this record?
        </h3>
        <p className="mt-2">This action cannot be undone</p>
        <div className="flex justify-end mt-8">
          <div className="flex justify-end w-60 gap-2">
            <button
              onClick={() => {
                document.getElementById("confirmation-modal").close();
              }}
              className="btn btn-outline"
            >
              CLOSE
            </button>
            <button onClick={handleDelete} className="btn btn-error text-white">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
