import * as React from 'react';
import {Image} from 'react-native';

export default ({path, gender}): React.Node => {
  return (
    <Image source={{uri: avatarUrl(path, gender)}} style={{height: 120, width: 90, flex: 1}}/>
  );
};

function avatarUrl(
  url?: ?string,
  gender?: ?string,
): string {
  let prefix = 'https://profi.ru';
  if (url) return `${prefix}${url}`;

  //if (forceStaticPrefix) prefix = '/static';
  if(gender && (gender.toLowerCase() === 'female' || gender.toLowerCase() === 'f')) {
    return `${prefix}/img/avatars/expert-no-image-female.svg`;
  }
  return `${prefix}/img/avatars/expert-no-image.svg`;
}