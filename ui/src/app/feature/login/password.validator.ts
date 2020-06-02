import {FormGroup} from '@angular/forms';

export const checkPassword = (group: FormGroup) => {
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;

  if (!pass || !confirmPass) {
    return;
  }

  return pass === confirmPass ? null : { isMatching: true };
};

