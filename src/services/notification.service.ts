import { toast } from 'react-toastify';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {
  public static error(message = DEFAULT_MESSAGE): void {
    console.log('here I am', message);
    toast.error(message);
  }
}

export { Notification };
