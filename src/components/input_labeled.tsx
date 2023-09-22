import { InputLabeledProps } from "../util/types";
import styles from "../styles/components/input_labeled.module.scss";

const InputLabeled = ({ id, name, value, onChangeFunction, type, label, ...rest } : InputLabeledProps) => {
  return (
    <article className={`flex flex-col justify-between items-start ${styles.input_container}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChangeFunction}
        {...rest}
      />
    </article>
  );
}

export default InputLabeled;