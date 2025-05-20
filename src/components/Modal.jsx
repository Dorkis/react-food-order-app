import { useRef } from "react";
import { useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref, children }) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="result-modal" >
            {children}
            <form method="dialog" >
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal'))
}