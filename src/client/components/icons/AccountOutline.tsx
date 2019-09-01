import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { mdiAccountOutline } from '@mdi/js';

function AccountOutlineIcon() {
  return (
    <SvgIcon viewBox='0 0 24 24'>
      <path d={mdiAccountOutline} />
    </SvgIcon>
  );
}

export default AccountOutlineIcon;
