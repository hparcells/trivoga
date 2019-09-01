import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { mdiAccount } from '@mdi/js';

function AccountIcon() {
  return (
    <SvgIcon viewBox='0 0 24 24'>
      <path d={mdiAccount} />
    </SvgIcon>
  );
}

export default AccountIcon;
