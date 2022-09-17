import { FC } from '../../common/types/types';
import styles from './styles.module.scss';

type Props = {
  text: string;
  margin: boolean;
};
export const Heading: FC<Props> = ({ text, margin }) => {
  return (
    <h2
      className={`${styles.mainHeading} ${
        margin ? styles.headingPadding : ''
      }`}
    >
      {text}
    </h2>
  );
};
