type Props = {
  label?: string;
};

export default function GoogleButton({ label = "Sign in" }: Props) {
  return <button type="button">{label}</button>;
}
