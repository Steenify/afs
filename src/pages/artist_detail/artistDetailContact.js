import React, { useState } from 'react';

import ArtistDetailContactDisplay from './artistDetailContactDisplay';
import ArtistDetailContactEdit from './artistDetailContactEdit';

const ArtistDetailInfo = () => {
  const [updating, setUpdating] = useState(false);

  return updating ? <ArtistDetailContactEdit setUpdating={setUpdating} /> : <ArtistDetailContactDisplay setUpdating={setUpdating} />;
};

export default ArtistDetailInfo;
