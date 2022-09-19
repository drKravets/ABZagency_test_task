import { FC } from '../../common/types/types';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import styles from './styles.module.scss';

type Props = {
  signUpOnClick: () => void;
};

export const Intro: FC<Props> = ({ signUpOnClick }) => {
  const headingText =
    'Test assignment for front-end developer';
  const paragraphText = `What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.`;
  return (
    <section className={styles.intro}>
      <div className={styles.introContent}>
        <Heading text={headingText} margin={false} />
        <p className={styles.introText}>{paragraphText}</p>
        <Button text='Sign up' onClick={signUpOnClick} />
      </div>
    </section>
  );
};
