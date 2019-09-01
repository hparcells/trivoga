import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { mdiAccountCheck } from '@mdi/js';

function AccountCheckIcon() {
  return (
    <SvgIcon viewBox='0 0 24 24'>
      <path d={mdiAccountCheck} />
    </SvgIcon>
  );
}

export default AccountCheckIcon;
