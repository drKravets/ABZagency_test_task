import { useEffect } from 'react';
import { FC } from '../../common/types/types';
import styles from './styles.module.scss';

type Props = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  setLoading?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export const Button: FC<Props> = ({
  text,
  disabled = false,
  onClick,
  setLoading,
}) => {
  useEffect(() => {
    if (disabled && setLoading) {
      setLoading(false);
    }
  }, [disabled]);

  return (
    <button
      className={`${styles.button} ${
        disabled ? `${styles.disabled}` : `${styles.active}`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
