import Button from "./Button";

function ConfirmModal({ title, body, onCancel, onConfirm }) {
    return (
        <section className="grid place-items-center w-100 min-h-screen p-4 fixed top-0 left-0 bg-blur w-full z-20">
            <div className="w-full sm:w-2/3 lg:w-1/3 bg-pink-900 p-3 text-white my-shadow rounded" >
                <h1 className="text-xl mt-1 mb-3 font-medium border-b border-b-slate-400">
                    {title}
                </h1>

                <p className="my-4 text-white text-sm">{body}</p>


                <div className="flex items-end gap-2 justify-end">
                    <Button
                        text="Cancel"
                        width="w-28"
                        bg="bg-transparent"
                        hover="hover:bg-pink-800"
                        focus="focus:ring-pink-800"
                        color="text-white-700"
                        onClick={onCancel}
                        loading={false}
                    />
                    <Button
                        text="Confirm"
                        width="w-28"
                        bg="bg-red-600"
                        hover="hover:bg-red-700"
                        focus="focus:ring-red-700"
                        color="text-white-700"
                        onClick={onConfirm}
                        loading={false}
                    />
                </div>

            </div>
        </section>
    )
}

export default ConfirmModal;