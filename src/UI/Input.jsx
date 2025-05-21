export default function Input({ type = 'text', label, name, ...props }) {

    return (
        <div className="control " >
            <label htmlFor={name}>{label}</label>
            <input id={name} type={type} name={name} {...props} />
        </div>)
}