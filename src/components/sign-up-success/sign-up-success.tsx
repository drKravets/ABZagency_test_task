import SuccessRegistration from '../../assets/images/360-success.jpg';
import { Heading } from '../heading/heading';

const SignUpSuccess = () => {
  return (
    <div>
      <Heading
        text='User successfully registered'
        margin={true}
      />
      <img
        src={SuccessRegistration}
        alt='successfully registered'
      />
    </div>
  );
};

export { SignUpSuccess };
