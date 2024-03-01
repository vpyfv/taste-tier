export type CustomButtonType = {
  text: String;
  onclick: () => void;
};

export interface CustomButtonProps {
  customButton: CustomButtonType;
}
const CustomButton = (props: CustomButtonProps) => {
  return (
    <button className=" bg-button px-5 py-3 rounded-full" onClick={props.customButton.onclick}>
      {props.customButton.text}
    </button>
  );
};
export default CustomButton;
