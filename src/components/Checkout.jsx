import { useContext } from "react";
import { useActionState } from "react";
import { useRef } from "react";
import CartContext from "../store/cart-context";
import UserProgressContext from "../store/user-progress-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "./Modal";
import { addOrder } from "../http.js";
import useFetch from "../hooks/useFetch";

export default function Checkout() {
    const dialog = useRef();
    const { progress, hideCheckout } = useContext(UserProgressContext);
    const { carts, removeCart } = useContext(CartContext);

    const { isFetching, error, fetchedData, sendRequest, cleadDate } = useFetch(addOrder, 'POST');

    const total = carts.reduce((total, cart) => total + cart.price * cart.count, 0);

    async function newOrderAction(prevFormState, formData) {
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const street = formData.get('street');
        const code = formData.get('code');
        const city = formData.get('city');

        let errors = [];

        if (!fullName.trim()) {
            errors.push('Add full name');
        }
        if (!email.trim().includes('@')) {
            errors.push('Enter valid email');
        }
        if (street.trim().length < 3) {
            errors.push('Add street');
        }
        if (code.trim().length < 3) {
            errors.push('Add code');
        }
        if (city.trim().length < 2) {
            errors.push('Add city');
        }

        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    fullName,
                    email,
                    street,
                    code,
                    city
                }
            }
        }

        const data = {
            order: {
                items: carts,
                customer: {
                    name: fullName,
                    email,
                    street,
                    "postal-code": code,
                    city
                }
            }
        }

       sendRequest(data);

        return {
            errors: null,
        }
    }

    function handleCloseOrderedCheckout() {
        hideCheckout()
        removeCart()
        cleadDate()
    }

    const [formState, formAction] = useActionState(newOrderAction, { errors: null });

    if(fetchedData && fetchedData!='' && !formState.errors) {
        return ( <Modal ref={dialog} className="result-modal" open={progress === 'checkout'}><h2>{fetchedData.message}</h2><div className="modal-actions" ><Button textOnly onClick={handleCloseOrderedCheckout} type="button" >Close</Button></div></Modal>)
    }

    return (
        <>
            <Modal ref={dialog} className="result-modal" open={progress === 'checkout'}>
                <h2>Checkout</h2>
                <p>Total: {total} zł</p>
                <form className="control" action={formAction}>

                    <Input label="Full name" name="fullName" defaultValue={formState.enteredValues?.fullName} />
                    <Input label="E-mail address" name="email" type="email" defaultValue={formState.enteredValues?.email} />
                    <Input label="Street" name="street" defaultValue={formState.enteredValues?.street} />
                    <div className="control-row">
                        <Input label="Postal Code" name="code" defaultValue={formState.enteredValues?.code} />
                        <Input label="City" name="city" defaultValue={formState.enteredValues?.city} />
                    </div>
                    {formState.errors && <div className='error'>{formState.errors.map(error => <p key={error}>{error}</p>)}</div>}

                    <div className="modal-actions" >
                        {isFetching && <p className="fallback-text">Order is creating....</p>}
                        {error && <p className="fallback-text">{error.message}</p>}
                        <Button textOnly onClick={hideCheckout} type="button" >Close</Button>
                        <Button >Submit order</Button>
                    </div>
                </form>

            </Modal>
        </>
    )
}