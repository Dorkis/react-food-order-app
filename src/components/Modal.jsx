import { useRef } from "react";
import { useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref, children, className = '', open }) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} open={open}>
            {children}
        </dialog>,
        document.getElementById('modal'))
}