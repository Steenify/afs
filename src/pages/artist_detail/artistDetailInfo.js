import React, { useState } from 'react';

import ArtistDetailInfoDisplay from './artistDetailInfoDisplay';
import ArtistDetailInfoEdit from './artistDetailInfoEdit';

const ArtistDetailInfo = () => {
  const [updating, setUpdating] = useState(false);

  return updating ? <ArtistDetailInfoEdit setUpdating={setUpdating} /> : <ArtistDetailInfoDisplay setUpdating={setUpdating} />;
};

export default ArtistDetailInfo;
