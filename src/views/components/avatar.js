import * as React from 'react';
import {Thumbnail} from 'native-base';

export default ({path, gender}): React.Node => {
  return <Thumbnail square size={90} source={{uri: avatarUrl(path, gender)}} />;
};

function avatarUrl(url?: ?string, gender?: ?string): string {
  let prefix = 'https://profi.ru';
  if (url) return `${prefix}${url}`;

  //if (forceStaticPrefix) prefix = '/static';
  if (
    gender &&
    (gender.toLowerCase() === 'female' || gender.toLowerCase() === 'f')
  ) {
    return `${prefix}/img/avatars/expert-no-image-female.svg`;
  }
  return `${prefix}/img/avatars/expert-no-image.svg`;
}
